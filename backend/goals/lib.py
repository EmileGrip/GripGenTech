from rest_framework import exceptions
from goals.serializers import *
from schema.models import Goal, GoalAction, ProjectVacancy
from django.db.models import Prefetch


def add_goal(name, description, start_date, due_date, user, company, actions, skills):
    goal = Goal.objects.create(
        name=name, 
        description=description,
        start_date=start_date,
        due_date=due_date,
        user=user,
        company=company,
        status='not started',
        skills=skills,
    )
    
    organized_actions = {'courses': [], 'projects': [], 'activities': []}

    for action in actions:
        if action['type'] == 'projects':
            if not ProjectVacancy.objects.filter(id=action['reference'], company=company, status='approved').exists():
                raise exceptions.ValidationError({'reference': 
                    [f'no project found with id {action["reference"]} and company id {company.id} and status approved']})
            else:
                project = ProjectVacancy.objects.get(id=action['reference'])
                action['details'] = {
                    'id': project.id,
                    'name': project.name,
                    'description': project.description,
                    'start_date': project.start_date.strftime("%Y-%m-%d"),
                    'end_date': project.end_date.strftime("%Y-%m-%d"),                    
                }
        
        GoalAction.objects.create(
            type=action['type'],
            reference=action.get('reference', None),
            details=action['details'],
            percentage=0,
            goal=goal,
            company=company,
            user=user
        )
        
        action_type = action['type']
        organized_actions[action_type].append(action)

    return goal, organized_actions

    

def get_goals(user, company_id):
    # retrieve all goals for the user with related actions
    results = []
    goals = Goal.objects.filter(user=user)
    
    for goal in goals:
        actions = goal.actions.values('id', 'type', 'reference', 'details', 'percentage')
        
        # Organize actions by type
        organized_actions = {'courses': [], 'projects': [], 'activities': []}
        for action in actions:
            action_type = action['type']
            organized_actions[action_type].append(action)
        
        results.append({
            'id': goal.id,
            'name': goal.name,
            'description': goal.description,
            'start_date': goal.start_date,
            'due_date': goal.due_date,
            'status': goal.status,
            'user_id': user,
            'company_id': company_id,
            'skills': goal.skills,
            'actions': organized_actions
        })
    
    return results


def update_goal(id, name, status, description, start_date, 
                due_date, skills, user):
    # check if user is the owner of the goal
    if not Goal.objects.filter(id=id, user=user).exists():
        raise exceptions.ValidationError({'id': [f'this user does not have a goal with id {id}']})
    
    goal = Goal.objects.get(id=id, user=user)
    if name:
        goal.name = name    
    if status:
        goal.status = status
    if description:
        goal.description = description
    if start_date:
        goal.start_date = start_date
    if due_date:
        goal.due_date = due_date
    if skills:
        goal.skills = skills
    goal.save()
    return goal


def delete_goal(id, user):
    # check if user is the owner of the goal
    if not Goal.objects.filter(id=id, user=user).exists():
        raise exceptions.ValidationError({'id': [f'No goal found with user id {user.id}']})
    
    goal = Goal.objects.get(id=id, user=user)
    goal.delete()    


def get_action(data, request):
    user       = request.user.id
    company_id = request.user.company_id.id
    
    return {
        "success": True,
        "message": "Goals retrieved successfully",
        "payload": get_goals(user, company_id)
    }


def post_action(data, request):
    name          = data.get('name')
    description   = data.get('description')
    start_date    = data.get('start_date')
    due_date      = data.get('due_date')
    actions       = data.get('actions')
    skills        = data.get('skills')
    user          = request.user
    company       = request.user.company_id
    
    # create goal in database and return it
    goal, organized_actions = add_goal(name, description, start_date, due_date, user, company, actions, skills)
    return {
        "success": True,
        "message": "Goal created successfully",
        "payload": {
            "id": goal.id,
            "name": goal.name,
            "description": goal.description,
            "start_date": goal.start_date,
            "due_date": goal.due_date,
            "status": goal.status,
            "user": goal.user.id,
            "company": goal.company.id,
            "skills": goal.skills,
            "actions": organized_actions
        }
    }


def put_action(data, request):
    id          = data.get('id')
    name        = data.get('name')
    status      = data.get('status')
    description = data.get('description')
    start_date  = data.get('start_date')
    due_date    = data.get('due_date')
    skills      = data.get('skills')
    user        = request.user
    
    updated_goal = update_goal(id, name, status, description, 
                               start_date, due_date, skills, user)
    
    return {
        "success": True,
        "message": "Goal updated successfully",
        "payload": {
            "id": updated_goal.id,
            "name": updated_goal.name,
            "description": updated_goal.description,
            "start_date": updated_goal.start_date,
            "due_date": updated_goal.due_date,
            "status": updated_goal.status,
            "user": updated_goal.user.id,
            "company": updated_goal.company.id,
            "skills": updated_goal.skills
        }
    }
    

def delete_action(data, request):
    id   = data.get('id')
    user = request.user
    
    delete_goal(id, user)

    return {
        "success": True,
        "message": "Goal deleted successfully",
    }
   
   
# -------------------------------------- GoalAction --------------------------------------
def get_user_actions(user, goal_id):
    goal_actions = GoalAction.objects.select_related('goal').all().filter(user=user, goal_id=goal_id).order_by('-id').values()
    organized_actions = {'courses': [], 'projects': [], 'activities': []}
    
    for action in goal_actions:
        if action['type'] == 'projects':
            organized_actions['projects'].append(action)
        elif action['type'] == 'courses':
            organized_actions['courses'].append(action)
        elif action['type'] == 'activities':
            organized_actions['activities'].append(action)
    
    return organized_actions


def actions_get_action(data, request):
    user    = request.user.id
    goal_id = data.get('goal_id')
    
    return {
        "success": True,
        "message": "Actions retrieved successfully",
        "payload": (get_user_actions(user, goal_id))
    }


def add_goal_action(actions, user, goal_id, company):
    # check if user is the owner of the goal
    if not Goal.objects.filter(id=goal_id, user=user).exists():
        raise exceptions.ValidationError({'id': [f'this user does not have a goal with id {goal_id}']})
    
    for action in actions:
        # check if action reference is valid if the action type == projects
        if action['type'] == 'projects':
            if not ProjectVacancy.objects.filter(id=action['reference']).exists():
                raise exceptions.ValidationError({'reference': ['Project not found']})
            else:
                project = ProjectVacancy.objects.get(id=action['reference'])
                action['details'] = {
                    'id': project.id,
                    'name': project.name,
                    'description': project.description,
                    'start_date': project.start_date.strftime("%Y-%m-%d"),
                    'end_date': project.end_date.strftime("%Y-%m-%d"), 
                    'status': project.status                 
                }
        GoalAction.objects.create(
            goal_id=goal_id,
            type=action['type'], 
            company=company,
            user=user,
            reference=action.get('reference', None),
            details=action['details'],
        )
        
    goal_actions = GoalAction.objects.filter(goal_id=goal_id).values()
    organized_actions = {'courses': [], 'projects': [], 'activities': []}
    for action in goal_actions:
        action_type = action['type']
        organized_actions[action_type].append(action)
    
    return organized_actions


def actions_post_action(data, request):
    actions = data.get('actions')
    goal_id = data.get('goal_id')
    user    = request.user
    company = request.user.company_id

    goal_actions = add_goal_action(actions, user, goal_id, company)
    
    return {
        "success": True,
        "message": "Action created successfully",
        "payload": goal_actions
    }
    
    
def update_action(id, type, reference, details, percentage):
    if details:
        if not type:
            raise exceptions.ValidationError({'type': ['Action type is required']})
    
    goal_action = GoalAction.objects.filter(id=id).first()
    
    if type == 'projects':
        project = ProjectVacancy.objects.filter(id=reference).first()
        if project is None:
            raise exceptions.ValidationError({'reference': [f'Project with id {reference} not found']})
        details = {
            'id': project.id,
            'name': project.name,
            'description': project.description,
            'start_date': project.start_date.strftime("%Y-%m-%d"),
            'due_date': project.end_date.strftime("%Y-%m-%d"), 
            'status': project.status                 
        }
    if type:
        goal_action.type = type
    if reference:
        goal_action.reference = reference
    if details:
        goal_action.details = details
    if percentage:
        goal_action.percentage = percentage
    goal_action.save()
    return GoalAction.objects.filter(id=id).values()
    
    
def actions_put_action(data, request):
    id          = data.get('id')
    type        = data.get('type')
    reference   = data.get('reference')
    details     = data.get('details')
    percentage  = data.get('percentage')
    
    updated_action = update_action(id, type, reference, details, percentage)
    
    return {
        "success": True,
        "message": "Action updated successfully",
        "payload": updated_action
    }
    
    
def delete_goal_action(id, user):
    # check if user is the owner of the action
    if not GoalAction.objects.filter(id=id, user=user).exists():
        raise exceptions.ValidationError({'id': [f'No action found with user id {user.id}']})
    
    action = GoalAction.objects.get(id=id, user=user)
    action.delete()
    

def action_delete_action(data, request):
    id   = data.get('id')
    user = request.user
    
    delete_goal_action(id, user)
    
    return {
        "success": True,
        "message": "Action deleted successfully",
    }