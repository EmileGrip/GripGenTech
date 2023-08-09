
from rest_framework import serializers, exceptions
from schema.models import Company,Role,GripFile
from django.forms.models import model_to_dict
import logging
from django.core.files.storage import default_storage




class CompanySerializer(serializers.Serializer):

    #definte the fields related to the model Company
    id = serializers.IntegerField(required=False)
    name = serializers.CharField(required=False,allow_blank=True,max_length=50)
    description = serializers.CharField(required=False,allow_blank=True,max_length=200)
    website = serializers.CharField(required=False,allow_blank=True,max_length=50)
    linkedin = serializers.CharField(required=False,allow_blank=True,max_length=50)
    industry = serializers.CharField(required=False,allow_blank=True,max_length=50)
    address1 = serializers.CharField(required=False,allow_blank=True,max_length=100)
    address2 = serializers.CharField(required=False,allow_blank=True,max_length=100)
    state = serializers.CharField(required=False,allow_blank=True,max_length=20)
    city = serializers.CharField(required=False,allow_blank=True,max_length=20)
    country = serializers.CharField(required=False,allow_blank=True,max_length=20)
    postal_code = serializers.CharField(required=False,allow_blank=True,max_length=10)
    phone = serializers.CharField(required=False,allow_blank=True,max_length=20)
    
    def __get_non_null_fields(self,**kwargs):
        return {k: v for k, v in kwargs.items() if v not in [None,""]}
    
    def get_response(self):
        return self.response

    def validate(self, data):
        
        if self.context['method'] == 'POST':
            return self.validate_post(data)
        if self.context['method'] == 'GET':
            return self.validate_get(data)
        if self.context['method'] == 'PUT':
            return self.validate_put(data)
        if self.context['method'] == 'DELETE':
            return self.validate_delete(data)

    def validate_get(self,data):
        
        company_id = data.get('id')

        #check if company_id is valid
        if company_id is None:
            #check if user is staff
            if self.context['request'].user.system_role == "staff":
                data = Company.objects.all().order_by('-id').values()
                for d in data:
                    if d['logo_id'] is not None:
                        #get logo file
                        logo_file =  GripFile.objects.filter(id = d['logo_id'] ).first()
                        d['logo'] = {
                            'id': logo_file.id,
                            'name': logo_file.name,
                            'url': default_storage.url(f"{logo_file.path}/{logo_file.name}")
                        }
            else:
                data = Company.objects.filter(id=self.context['request'].user.company_id.id).order_by('-id').values().first()
                if data['logo_id'] is not None:
                    #get logo file
                    logo_file =  GripFile.objects.filter(id = data['logo_id'] ).first()
                    data['logo'] = {
                        'id': logo_file.id,
                        'name': logo_file.name,
                        'url': default_storage.url(f"{logo_file.path}/{logo_file.name}")
                    }
        elif str(company_id).isnumeric() is False:
            raise exceptions.ValidationError('Invalid company id')
        else:
            
            if self.context['request'].user.system_role != "staff":
                if company_id != self.context['request'].user.company_id.id:
                    raise exceptions.ValidationError('You are not authorized to view this company')
            #get company data as dict
            data = Company.objects.filter(id=company_id).values().first()
        
            if data['logo_id'] is not None:
                #get logo file
                logo_file =  GripFile.objects.filter(id = data['logo_id'] ).first()
                data['logo'] = {
                    'id': logo_file.id,
                    'name': logo_file.name,
                    'url': default_storage.url(f"{logo_file.path}/{logo_file.name}")
                }
        #set response data in self.response
        self.response = {
            "success":True,
            "message":"Company data fetched successfully",
            "payload": {
    
                "data": data}
        }
        #return validated data
        return {
            'id': company_id,

        }
    
    def validate_post(self,data):
        #check name field 
        name = data.get('name')
        if name is None:
            raise exceptions.ValidationError('Name is required')
        
        #check permissions
        if self.context['request'].user.system_role != "staff":
            raise exceptions.ValidationError('You are not authorized to create a company')
        #check all other fields
        description = data.get('description',None)
        website = data.get('website',None)
        linkedin = data.get('linkedin',None)
        industry = data.get('industry',None)
        address1 = data.get('address1', None)
        address2 = data.get('address2', None)
        state = data.get('state', None)
        city = data.get('city', None)
        country = data.get('country', None)
        postal_code = data.get('postal_code', None)
        phone = data.get('phone', None)
        #check if name already exists
        if Company.objects.filter(name=name).exists():
            raise exceptions.ValidationError('Company name already exists')
        #get non null fields
        company_data = self.__get_non_null_fields(
            description=description,
            website=website,
            linkedin=linkedin,
            industry=industry,
            address1=address1,
            address2=address2,
            state=state,
            city=city,
            country=country,
            postal_code=postal_code,
            phone=phone,
        )
        #create new company
        company = Company.objects.create(name=name,**company_data)
        #save company
        company.save()
        #create position
        LastInsertId = (Role.objects.last()).id
        r = Role.objects.create(parent_role=None,company_id=company,allign="bottom",selected_role_id=LastInsertId+1)
        r.save()
        #store response in self.response
        self.response = {
            "success":True,
            "message":"Company created successfully",
            "payload": model_to_dict(company)
        }
        #return data
        return {
            'name': name,
            'description': description,
            'website': website,
            'linkedin': linkedin,
            'industry': industry,
            'address1': address1,
            'address2': address2,
            'state': state,
            'city': city,
            'country': country,
            'postal_code': postal_code,
            'phone': phone,
        }
        
    def validate_put(self,data):
        #check id field 
        id = data.get('id')
        if id is None and self.context['request'].user.system_role=="staff":
            raise exceptions.ValidationError('ID is required')
        elif id is None:
            id = self.context['request'].user.company_id.id
        #check permissions
        if not self.context['request'].user.system_role in ["staff","admin"]:
            raise exceptions.ValidationError('You are not authorized to update this company')
        if self.context['request'].user.system_role == "admin" and self.context['request'].user.company_id.id != id:
            raise exceptions.ValidationError('You are not authorized to update this company')
        #check all other fields
        description = data.get('description',None)
        website = data.get('website',None)
        linkedin = data.get('linkedin', None)
        industry = data.get('industry', None)
        address1 = data.get('address1', None)
        address2 = data.get('address2', None)
        state = data.get('state', None)
        city = data.get('city', None)
        country = data.get('country', None)
        postal_code = data.get('postal_code', None)
        phone = data.get('phone', None)
        name = data.get('name', None)
        
        #combine the non null fields in a dictionary
        comnpany_data = self.__get_non_null_fields(
            description=description,
            website=website,
            linkedin=linkedin,
            industry=industry,
            address1=address1,
            address2=address2,
            state=state,
            city=city,
            country=country,
            postal_code=postal_code,
            phone=phone,
            name=name
        )
       
        #check if name already exists
        if not Company.objects.filter(id=id).exists():
            raise exceptions.ValidationError('Company name does not exists')
        #edit company
        if not Company.objects.filter(id=id).update(**comnpany_data):
            raise exceptions.ValidationError('Error updating company')
        #get company data
        company = Company.objects.filter(id=id).first()
        #store response in self.response
        self.response = {
            "success":True,
            "message":"Company updated successfully",
            "payload": model_to_dict(company)
        }
        #return data
        return comnpany_data
        
    def validate_delete(self,data):
        #check id field 
        id = data.get('id')
        if id is None:
            raise exceptions.ValidationError('ID is required')
        #check permissions
        if self.context['request'].user.system_role != "staff" :
            raise exceptions.ValidationError('You are not authorized to delete a company')
        #check if name already exists
        if not Company.objects.filter(id=id).exists():
            raise exceptions.ValidationError('Company name does not exists')
        #delete company
        Company.objects.filter(id=id).delete()
        #store response in self.response
        self.response = {
            "success":True,
            "message":"Company deleted successfully",
        }
        #return data
        return {
            'id': id,
        }