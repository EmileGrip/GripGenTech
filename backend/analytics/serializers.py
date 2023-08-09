
from rest_framework import serializers, exceptions
from schema.models import GripUser,Company,JobProfile,SkillRequirement,Role,SkillProficiency,Experience
from django.forms.models import model_to_dict


class AnalyticsSerializer(serializers.Serializer):

    company_id = serializers.IntegerField(required=False)
    
    def get_response(self):
        return self.response

    def validate(self, data):

        if self.context['request'].user.system_role != "staff":
            company_id = self.context['request'].user.company_id.id
            if company_id is None:
                raise exceptions.ValidationError("company_id is required")

            company = Company.objects.filter(id=company_id)
            if company is None:
                raise exceptions.ValidationError("company does not exist")
            company = company.first()

        self.response = {
            "success":True,
            "message":"Analytics fetched successfully",
            "payload": {"analysis":{},"usage":{}}
        }
        #get all data
        if self.context['request'].user.system_role == "manager":
            my_role = Role.objects.filter(user_id=self.context['request'].user)
            if my_role.exists() is False:
                raise exceptions.ValidationError('You are not assigned to any role')
            my_role = my_role.first()
            query = f"""
            WITH RECURSIVE chained_users AS (
            SELECT *
            FROM public.schema_role
            WHERE id = {my_role.id}
            UNION
            SELECT t.*
            FROM public.schema_role t
            INNER JOIN chained_users c ON t.parent_role_id = c.id
            )
            SELECT *
            FROM chained_users;
            """
            managed_roles = Role.objects.raw(query)
            ids = []
            
            for role in managed_roles:
                role = model_to_dict(role)
                if role['user_id']:
                    ids.append(role['user_id'])
            #remove current logged in user id from ids
            ids.remove(self.context['request'].user.id)
            all_users = GripUser.objects.filter(id__in=ids).order_by('-id')
            all_skill_prof = SkillProficiency.objects.filter(user_id__in=all_users).values()
            all_roles = Role.objects.filter(company_id=company,user_id__in=all_users)
            all_job_profiles = all_roles.values_list('job_profile_id',flat=True)
            all_skill_req = SkillRequirement.objects.filter(job_profile_id__in=all_job_profiles).values()
            all_experiences = Experience.objects.filter(company_id=company,user_id__in=all_users).values()
            all_job_profiles = JobProfile.objects.filter(id__in=all_job_profiles).values()
            all_users = all_users.values()
            all_roles = all_roles.values()
        elif self.context['request'].user.system_role == "admin": 
            all_users = GripUser.objects.filter(company_id=company)
            all_skill_prof = SkillProficiency.objects.filter(company_id=company).values()
            all_roles = Role.objects.filter(company_id=company)
            all_job_profiles = all_roles.values_list('job_profile_id',flat=True)
            all_skill_req = SkillRequirement.objects.filter(company_id=company,job_profile_id__in=all_job_profiles).values()
            all_experiences = Experience.objects.filter(company_id=company).values()
            all_job_profiles = JobProfile.objects.filter(id__in=all_job_profiles).values()
            all_users = all_users.values()
            all_roles = all_roles.values()
        elif self.context['request'].user.system_role == "employee":
            all_users = GripUser.objects.filter(system_role__in=['employee','admin','manager'])
            all_skill_prof = SkillProficiency.objects.all().values()
            all_roles = Role.objects.all()
            all_job_profiles = all_roles.values_list('job_profile_id',flat=True)
            all_skill_req = SkillRequirement.objects.filter(job_profile_id__in=all_job_profiles).values()
            all_experiences = Experience.objects.filter(company_id=company).values()
            all_job_profiles = JobProfile.objects.filter(id__in=all_job_profiles).values()
            all_users = all_users.values()
            all_roles = all_roles.values()
        else:
            all_users = GripUser.objects.filter(system_role__in=['employee','admin','manager']).values()
            all_companies = Company.objects.all().values()

        if self.context['request'].user.system_role != 'staff':
            self.get_skill_analytics(
                all_users=all_users,
                all_skill_prof=all_skill_prof,
                all_skill_req=all_skill_req,
                all_roles=all_roles,
                all_job_profiles=all_job_profiles,
                all_experiences=all_experiences
            )
            self.get_usage_analytics(
                all_users=all_users,
                all_skill_prof=all_skill_prof,
                all_skill_req=all_skill_req,
                all_roles=all_roles,
                all_job_profiles=all_job_profiles,
                all_experiences=all_experiences
            )
        else:
            self.get_staff_analytics(
                all_users=all_users,
                all_companies=all_companies
            )
        return {}

    def get_skill_analytics(self,**params):
        #define skills list
        skill_gaps = {}
        job_gaps = {}
        employee_gaps = {}
        ####
        # calculating job realted graphs : 
        # we have 2 job related graphs:
        # 1. job average gaps
        # 2. job score target graph
        ####

        for role in params["all_roles"]:
            if role["job_profile_id_id"] is not None and role["user_id_id"] is not None:
                if not role["job_profile_id_id"] in job_gaps.keys():
                    job_gaps[role["job_profile_id_id"]] = {
                        "title": role["title"],
                        "skills":{},
                        "users":0,
                        'score':0,
                        'target':0,
                    }
                #add to employee gaps
                employee_gaps[role["user_id_id"]] = {
                    "title":'',
                    "score":0,
                    "target":0,
                    "skills": 0,
                    "percentage":0,
                    "gap":0,
                    "avg":0
                }
                job_gaps[role["job_profile_id_id"]]["users"]+=1
                for skill in params["all_skill_req"]:
                    if role["job_profile_id_id"] == skill["job_profile_id_id"]:
                        if not skill["skill_id"] in job_gaps[role["job_profile_id_id"]]["skills"].keys():
                            job_gaps[role["job_profile_id_id"]]["skills"][skill["skill_id"]]={
                                "title":skill["title"],
                                "score":0,
                                "target":0
                            }
                        job_gaps[role["job_profile_id_id"]]["skills"][skill["skill_id"]]["target"]+=skill["level"]
                        job_gaps[role["job_profile_id_id"]]['target']+=skill["level"]
                        employee_gaps[role["user_id_id"]]["target"]+=skill["level"]

                for skill in params["all_skill_prof"]:
                    if skill["user_id_id"]==role["user_id_id"] and skill["skill_id"] in job_gaps[role["job_profile_id_id"]]["skills"].keys():
                        job_gaps[role["job_profile_id_id"]]["skills"][skill["skill_id"]]["score"]+=skill["level"]
                        job_gaps[role["job_profile_id_id"]]['score']+=skill["level"]
                        employee_gaps[role["user_id_id"]]["score"]+=skill["level"]
                        employee_gaps[role["user_id_id"]]["skills"]+=1
                job_gaps[role["job_profile_id_id"]]['percentage'] = job_gaps[role["job_profile_id_id"]]["score"] /job_gaps[role["job_profile_id_id"]]["target"] * 100 if job_gaps[role["job_profile_id_id"]]["target"]!=0 else 0
        #calculate averages 
        for job in job_gaps.keys():
            job_avg = 0
            for skill in job_gaps[job]["skills"].keys():
                job_gaps[job]["skills"][skill]["gap"] = job_gaps[job]["skills"][skill]["score"]-job_gaps[job]["skills"][skill]["target"]
                job_gaps[job]["skills"][skill]["avg_gap"] = job_gaps[job]["skills"][skill]["gap"] /job_gaps[job]["users"]
                job_avg += job_gaps[job]["skills"][skill]["avg_gap"]

                if not skill in skill_gaps.keys():
                    skill_gaps[skill] = {
                        "title":job_gaps[job]["skills"][skill]["title"],
                        "avg":0,
                        'users':0,
                        "score":0,
                        "target":0
                    }
                skill_gaps[skill]["users"]+= job_gaps[job]["users"]
                skill_gaps[skill]["score"]+=job_gaps[job]["skills"][skill]["score"]
                skill_gaps[skill]["target"]+=job_gaps[job]["skills"][skill]["target"]
            job_gaps[job]["avg_gap"]=job_avg/len(job_gaps[job]["skills"].keys()) if len(job_gaps[job]["skills"].keys())>0 else 0

        for skill in skill_gaps.keys():
            skill_gaps[skill]["avg"]=(skill_gaps[skill]["score"]-skill_gaps[skill]["target"])/skill_gaps[skill]["users"]

        #calculate employee gaps
        for user in employee_gaps.keys():
            #get employee name
            for gripuser in params["all_users"]:
                if gripuser["id"]==user:
                    employee_gaps[user]["title"]=gripuser["first_name"]+" "+gripuser["last_name"]
                    break
            if employee_gaps[user]["title"] == '':
                gripuser = GripUser.objects.filter(id=user).first()
                employee_gaps[user]["title"]=gripuser.first_name+" "+gripuser.last_name
            employee_gaps[user]["gap"] = employee_gaps[user]["score"]-employee_gaps[user]["target"]
            employee_gaps[user]["avg"] = employee_gaps[user]["gap"] /employee_gaps[user]["skills"] if employee_gaps[user]["skills"]>0 else 0
            employee_gaps[user]["percentage"] = employee_gaps[user]["score"] /employee_gaps[user]["target"] * 100 if employee_gaps[user]["target"]>0 else 0
        
        #calculate skill presence
        skill_presence = {}
        for skill in params["all_skill_prof"]:
            if not skill["skill_id"] in skill_presence.keys():
                skill_presence[skill["skill_id"]] = {
                    "title":skill["title"],
                    "basic":1 if skill["level"]==1 else 0,
                    "intermediate":1 if skill["level"]==2 else 0,
                    "advanced":1 if skill["level"]==3 else 0,
                    "expert":1 if skill["level"]==4 else 0,
                }
            else:
                skill_presence[skill["skill_id"]]["basic"]+=1 if skill["level"]==1 else 0
                skill_presence[skill["skill_id"]]["intermediate"]+=1 if skill["level"]==2 else 0
                skill_presence[skill["skill_id"]]["advanced"]+=1 if skill["level"]==3 else 0
                skill_presence[skill["skill_id"]]["expert"]+=1 if skill["level"]==4 else 0

        #fill response with calculated analytics       
        self.response["payload"]["analysis"]["job_avg_gaps"] = {
            "labels":[],
            "data" : []
        }
        for j in job_gaps.values():
            self.response["payload"]["analysis"]["job_avg_gaps"]["labels"].append(j["title"] )
            self.response["payload"]["analysis"]["job_avg_gaps"]["data"].append(j["avg_gap"] )

        self.response["payload"]["analysis"]["skill_avg_gaps"] = {
            "labels": [],
            "data":[]
        }
        for j in skill_gaps.values():
            self.response["payload"]["analysis"]["skill_avg_gaps"]["labels"].append(j["title"] )
            self.response["payload"]["analysis"]["skill_avg_gaps"]["data"].append(j["avg"] )

        self.response["payload"]["analysis"]["employee_avg_gaps"] = {
            "labels": [],
            "data":[]
        }
        for j in employee_gaps.values():
            self.response["payload"]["analysis"]["employee_avg_gaps"]["labels"].append(j["title"] )
            self.response["payload"]["analysis"]["employee_avg_gaps"]["data"].append(j["avg"] )
        
        self.response["payload"]["analysis"]["skill_gaps"] = {
            "labels": [],
            "data":{"score":[],"target":[],"percentage":[]}
        }
        skill_gaps_list = list(job_gaps.values())
        #sort skill gaps according to score
        skill_gaps_list.sort(key=lambda x: x['score'], reverse=True)
        #get the top 20 gaps
        skill_gaps_list = skill_gaps_list[:20]
        for j in skill_gaps_list:
            self.response["payload"]["analysis"]["skill_gaps"]["labels"].append(j["title"] )
            self.response["payload"]["analysis"]["skill_gaps"]["data"]["score"].append(j["score"] )
            self.response["payload"]["analysis"]["skill_gaps"]["data"]["target"].append(j["target"] )
            self.response["payload"]["analysis"]["skill_gaps"]["data"]["percentage"].append(j["percentage"] )

        self.response["payload"]["analysis"]["employee_gaps"] = {
            "labels": [],
            "data":{"score":[],"target":[],"percentage":[]}
        }
        employee_gaps_list = list(employee_gaps.values())
        #sort employee gaps according to score
        employee_gaps_list.sort(key=lambda x: x['score'], reverse=True)
        #get the top 20 gaps
        employee_gaps_list = employee_gaps_list[:20]
        for j in employee_gaps_list:
            self.response["payload"]["analysis"]["employee_gaps"]["labels"].append(j["title"] )
            self.response["payload"]["analysis"]["employee_gaps"]["data"]["score"].append(j["score"] )
            self.response["payload"]["analysis"]["employee_gaps"]["data"]["target"].append(j["target"] )
            self.response["payload"]["analysis"]["employee_gaps"]["data"]["percentage"].append(j["percentage"] )

        
        self.response["payload"]["analysis"]["skill_presence"]={}
        for skill in skill_presence.values():  
            base = skill["basic"]+skill["intermediate"]+skill["advanced"]+skill["expert"]
            if base==0:
                base=1
            self.response["payload"]["analysis"]["skill_presence"][skill["title"]] = {
                "labels": ["Basic", "Intermediate", "Advanced", "Expert"],
                "data": [skill["basic"], skill["intermediate"], skill["advanced"], skill["expert"]],
                'percentage':[skill["basic"]/base*100, skill["intermediate"]/base*100, skill["advanced"]/base*100, skill["expert"]/base*100]
            }
        if self.response["payload"]["analysis"]["skill_presence"]=={}:
            self.response["payload"]["analysis"]["skill_presence"]['no skills']={
                "labels": [],
                "data": []
            }
          
        #sort skill avg gaps according to avg value

        avg_data = skill_gaps.values()
        avg_data = sorted(avg_data, key=lambda k: k['score'], reverse=True)
        self.response["payload"]["analysis"]["top_skills"]={
            "labels":[],
            "data":[]
        }
        for skill in avg_data[:5]:
            self.response["payload"]["analysis"]["top_skills"]["labels"].append(skill["title"])
            self.response["payload"]["analysis"]["top_skills"]["data"].append(skill["avg"])

        #sort skill gaps according to avg value
        avg_data = sorted(avg_data, key=lambda k: k['score'])
        self.response["payload"]["analysis"]["missing_skills"]={
            "labels":[],
            "data":[]
        }
        for skill in avg_data[:5]:
            self.response["payload"]["analysis"]["missing_skills"]["labels"].append(skill["title"])
            self.response["payload"]["analysis"]["missing_skills"]["data"].append(skill["avg"])

    def get_job_stats(self,**params):
        job_gaps = {}
        for role in params["all_roles"]:
            if role["job_profile_id_id"] is not None and role["user_id_id"] is not None:
                if not role["job_profile_id_id"] in job_gaps.keys():
                    job_gaps[role["job_profile_id_id"]] = {
                        "title": role["title"],
                        "skills":{},
                        "users":0,
                        'score':0,
                        'target':0,
                        'percentage':0
                    }
                job_gaps[role["job_profile_id_id"]]["users"]+=1
                for skill in params["all_skill_req"]:
                    if role["job_profile_id_id"] == skill["job_profile_id_id"]:
                        if not skill["skill_id"] in job_gaps[role["job_profile_id_id"]]["skills"].keys():
                            job_gaps[role["job_profile_id_id"]]["skills"][skill["skill_id"]]={
                                "title":skill["title"],
                                "score":0,
                                "target":skill["level"]
                            }
                        else:
                            job_gaps[role["job_profile_id_id"]]["skills"][skill["skill_id"]]["target"]+=skill["level"]
                            job_gaps[role["job_profile_id_id"]]['target']+=skill["level"]

                for skill in params["all_skill_prof"]:
                    if skill["user_id_id"]==role["user_id_id"] and skill["skill_id"] in job_gaps[role["job_profile_id_id"]]["skills"].keys():
                        job_gaps[role["job_profile_id_id"]]["skills"][skill["skill_id"]]["score"]+=skill["level"]
                        job_gaps[role["job_profile_id_id"]]['score']+=skill["level"]
                job_gaps[role["job_profile_id_id"]]['percentage'] = job_gaps[role["job_profile_id_id"]]["score"] /job_gaps[role["job_profile_id_id"]]["target"] * 100 if job_gaps[role["job_profile_id_id"]]["target"]!=0 else 0
        
        
    def get_usage_analytics(self,**params):
        #get the chart of user account creation date
        user_account_dates = {}
        #get profile completed states
        profile_completed = {
            "labels": ["Completed", "Uncompleted"],
            "data":[0,0]
        }
        #get roles ratio in company
        roles_ratio = {
            "labels":["Employee", "Manager", "Admin"],
            "data":[0,0,0]
        }
        for user in params["all_users"]:
            creation_date = user["created_at"]
            #get the year of datetime object
            year = creation_date.year
            if not year in user_account_dates.keys():
                user_account_dates[year] ={
                    "labels":[
                        "Jan",
                        "Feb",
                        "March",
                        "April",
                        "May",
                        "June",
                        "July",
                        "Aug",
                        "Sep",
                        "Oct",
                        "Nov",
                        "Dec"
                    ],
                    "data":[0,0,0,0,0,0,0,0,0,0,0,0]
                }
            #get month number
            month = int(creation_date.month)
            user_account_dates[year]['data'][month-1] += 1

            #check if user has at least one skill proficiency
            has_proficiency = False
            for skill_proficiency in params["all_skill_prof"]:
                if skill_proficiency["user_id_id"] == user["id"]:
                    has_proficiency = True
                    break
            #check if user has at least one experience
            has_experience = False
            for experience in params["all_experiences"]:
                if experience["user_id_id"] == user["id"]:
                    has_experience = True
                    break
            if has_proficiency and has_experience:
                profile_completed["data"][0] += 1
            else:
                profile_completed["data"][1] += 1

            if user["system_role"] == "employee":
                roles_ratio["data"][0] += 1
            elif user["system_role"] == "manager":
                roles_ratio["data"][1] += 1
            elif user["system_role"] == "admin":
                roles_ratio["data"][2] += 1
        self.response["payload"]["usage"] = {}
        self.response["payload"]["usage"]["account_creation"] = user_account_dates
        self.response["payload"]["usage"]["profile_completed"] = profile_completed
        self.response["payload"]["usage"]["roles_ratio"] = roles_ratio
        self.response["payload"]["usage"]["total_users"] = len(params["all_users"])

    def get_staff_analytics(self,**params):
        user_account_dates = {}
        company_account_dates = {}
        for user in params["all_users"]:
            creation_date = user["created_at"]
            #get the year of datetime object
            year = creation_date.year
            if not year in user_account_dates.keys():
                user_account_dates[year] ={
                    "labels":[
                        "Jan",
                        "Feb",
                        "March",
                        "April",
                        "May",
                        "June",
                        "July",
                        "Aug",
                        "Sep",
                        "Oct",
                        "Nov",
                        "Dec"
                    ],
                    "data":[0,0,0,0,0,0,0,0,0,0,0,0]
                }
            #get month number
            month = int(creation_date.month)
            user_account_dates[year]['data'][month-1] += 1

        for company in params["all_companies"]:
            creation_date = company["created_at"]
            #get the year of datetime object
            year = creation_date.year
            if not year in company_account_dates.keys():
                company_account_dates[year] ={
                    "labels":[
                        "Jan",
                        "Feb",
                        "March",
                        "April",
                        "May",
                        "June",
                        "July",
                        "Aug",
                        "Sep",
                        "Oct",
                        "Nov",
                        "Dec"
                    ],
                    "data":[0,0,0,0,0,0,0,0,0,0,0,0]
                }
            #get month number
            month = int(creation_date.month)
            company_account_dates[year]['data'][month-1] += 1

        
        self.response["payload"]["usage"]["user_account_creation"] = user_account_dates
        self.response["payload"]["usage"]["company_account_creation"] = company_account_dates
        self.response["payload"]["usage"]["total_users"] = len(params["all_users"])
        self.response["payload"]["usage"]["total_customers"] = Company.objects.all().count()