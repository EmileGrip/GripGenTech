from rest_framework import serializers, exceptions
class PostSerializer(serializers.Serializer):
    
    #define the fields related to the model Search
    key = serializers.ChoiceField(required=True,choices=['user','job_profile','skill','role','department'])
    value = serializers.CharField(required=True,max_length=50)
    limit= serializers.IntegerField(required=False,default=10)
    company_id = serializers.IntegerField(write_only=True,required=False)
    def validate(self, data):
        #get fields from request object
        search_key = data.get('key').lower()
        value = data.get('value')
        limit = data.get('limit')
        #check permissions 
        system_role =  self.context['request'].user.system_role
        company_id = self.context['request'].user.company_id.id
        if search_key == "user":
            if not (system_role == 'staff' or system_role == 'admin'):
                raise exceptions.ValidationError('You are not authorized to perform this action')
        elif search_key == "role":
            if not (system_role == 'staff' or system_role == 'admin'):
                raise exceptions.ValidationError('You are not authorized to perform this action')
        return {
                "key":search_key,
                "value":value,
                "limit":limit,
                "company_id":company_id
            }
        
