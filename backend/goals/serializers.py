from neomodel import db
from rest_framework import serializers
from schema.models import Goal, GoalAction


class CourseActionSerializer(serializers.Serializer):
    id            = serializers.IntegerField(required=False)
    title         = serializers.CharField(required=False)
    url           = serializers.CharField(required=False)
    price         = serializers.CharField(required=False)
    description   = serializers.CharField(required=False)
    is_paid       = serializers.BooleanField(required=False)
    price_detail  = serializers.JSONField(required=False)
    image_240x135 = serializers.CharField(required=False)

    def validate(self, data):
        return data


class MentorActionSerializer(serializers.Serializer):
    pass


class ProjectActionSerializer(serializers.Serializer):
    id          = serializers.IntegerField(required=False)
    title       = serializers.CharField(required=False)
    description = serializers.CharField(required=False)
    start_date  = serializers.DateField(required=False, format="%Y-%m-%d")
    end_date    = serializers.DateField(required=False, format="%Y-%m-%d")


class ActivityActionSerializer(serializers.Serializer):
    title       = serializers.CharField(required=True)
    description = serializers.CharField(required=False)

    def validate(self, data):
        return data


class GoalActionsSerializer(serializers.ModelSerializer):
    goal_id = serializers.IntegerField(required=False)
    actions = serializers.JSONField(required=False)

    class Meta:
        model = GoalAction
        fields = ['id', 'percentage', 'goal_id', 'actions', 'type', 'reference', 'details']
    
    def validate(self, data):
        action_type = data.get('type')
        details_data = data.get('details')
        valid_types = ['courses', 'projects', 'mentor', 'activities']
         
        # Validate 'type', 'reference', and 'details' in the main data
        if action_type not in valid_types:
            raise serializers.ValidationError(f'Type must be one of {valid_types}')

        if action_type in ['courses', 'projects'] and not data.get('reference'):
            raise serializers.ValidationError(f'Reference is required for {action_type} action')

        if action_type in ['courses', 'projects'] and details_data == {}:
            details_data = {}
        elif action_type in ('courses', 'projects') and not details_data:
            raise serializers.ValidationError(f'Details must be provided alt least empty dict for courses and projects')
        if action_type == "activities" and not details_data:
            raise serializers.ValidationError(f'Details is required for {action_type} action')
        
        # Validate details_data with specific serializer
        serializer = None

        if action_type == 'courses':
            serializer = CourseActionSerializer(data=details_data)
        elif action_type == 'projects':
            serializer = ProjectActionSerializer(data=details_data)
        elif action_type == 'mentor':
            serializer = MentorActionSerializer(data=details_data)
        elif action_type == 'activities':
            serializer = ActivityActionSerializer(data=details_data)

        if serializer is not None:
            serializer.is_valid(raise_exception=True)
            data['details'] = serializer.validated_data

        return data
    
    
class PostGoalSerializer(serializers.ModelSerializer):
    skills   = serializers.JSONField(required=False)
    actions  = GoalActionsSerializer(many=True, required=True)
    due_date = serializers.DateField(required=True)

    class Meta:
        model = Goal
        fields = ['id', 'name', 'description', 'start_date', 
                  'due_date', 'skills', 'status', 'actions']

    def validate(self, data):
        if data.get('due_date') and data.get('start_date') and data['due_date'] < data['start_date']:
            raise serializers.ValidationError('due_date must be greater than start_date')

        return data

    def validate_skills(self, value):
        skills = []
        for skill_id in value:
            # check if skill_id is valid int
            if not isinstance(skill_id, int):
                raise serializers.ValidationError(f'Skill id must be an integer')
            skill, _ = db.cypher_query(f'MATCH (s:Skill) WHERE ID(s) = {skill_id} RETURN s', None, resolve_objects=True)
            if len(skill) > 0:
                skills.append({
                    "title":skill[0][0].preferredLabel,
                    "description":skill[0][0].description,
                    "skill_id":skill_id 
                })
            else:
                raise serializers.ValidationError(f'No skill found with id {skill_id}')
        
        return skills
    
    def validate_actions(self, value):
        if value == []:
            raise serializers.ValidationError('at least one action must be provided')
        return value 

    
class PostGoalActionsSerializer(GoalActionsSerializer):
    goal_id = serializers.IntegerField(required=True)
    actions = serializers.JSONField(required=True)

    def validate(self, data):
        for action in data.get('actions'):
            # applay GoalActionsSerializer validation
            goal_action_serializer = GoalActionsSerializer(data=action)
            goal_action_serializer.is_valid(raise_exception=True)
        return data   
    
    def validate_actions(self, value):
        if value == []:
            raise serializers.ValidationError('at least one action must be provided')
        return value         
                                        
                                                                                      
class DeleteGoalSerializer(serializers.ModelSerializer):
    id   = serializers.IntegerField(required=True)
    user = serializers.CharField(required=False)

    class Meta:
        model = Goal
        fields = ['id', 'user']

    def validate_id(self, value):
        if not Goal.objects.filter(id=value).exists():
            raise serializers.ValidationError(f'No goal found with id {value}')
        return value
    

class DeleteGoalActionsSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=True)

    class Meta:
        model = GoalAction
        fields = ['id']

    def validate_id(self, value):
        if not GoalAction.objects.filter(id=value).exists():
            raise serializers.ValidationError(f'No goal action found with id {value}')
        return value
    
    
class PutGoalActionsSerializer(GoalActionsSerializer):
    id         = serializers.IntegerField(required=True)
    percentage = serializers.IntegerField(required=False)
    type       = serializers.CharField(required=False)
    details    = serializers.JSONField(required=False)
    actions    = serializers.JSONField(required=False)
    goal_id    = serializers.IntegerField(required=False)
    

    def validate_id(self, value):
        if not GoalAction.objects.filter(id=value).exists():
            raise serializers.ValidationError(f'No goal action found with id {value}')
        return value

    
class PutGoalSerializer(PostGoalSerializer):
    id          = serializers.IntegerField(required=True)
    name        = serializers.CharField(required=False)
    description = serializers.CharField(required=False)    
    status      = serializers.CharField(required=False)
    start_date  = serializers.DateField(required=False)
    due_date    = serializers.DateField(required=False)
    skills      = serializers.JSONField(required=False)
    actions     = GoalActionsSerializer(many=True, required=False)
    status      = serializers.ChoiceField(
        required=False,
        choices=('in progress', 'completed', 'not started'),
        error_messages={'invalid_choice': 'Invalid status. Must be one of: in progress, completed, not started.'}
    )

    def validate_id(self, value):
        if not Goal.objects.filter(id=value).exists():
            raise serializers.ValidationError(f'No goal found with id {value}')
        return value
    
    
class GetGoalActionsSerializer(serializers.ModelSerializer):
    id      = serializers.IntegerField(required=False)
    goal_id = serializers.IntegerField(required=True)

    class Meta:
        model = GoalAction
        fields = ['id', 'goal_id']
        
    def validate_goal_id(self, value):
        if not GoalAction.objects.filter(goal_id=value).exists():
            raise serializers.ValidationError(f'No goal found with id {value} in goal actions')
        return value