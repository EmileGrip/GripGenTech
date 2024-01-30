import requests
import base64
from rest_framework.exceptions import ValidationError
from rest_framework import exceptions


class BaseProvider:
    def __init__(self,**kwrds):
      for key,value in kwrds.items():
        setattr(self,str(key),value)

    def get(self,**kwrds):
      params = self.map_inputs(**kwrds)
      data = self.get_data(**params)
      return self.parse_output(data)

    #all the following methods should be overriden
    def map_inputs(self,**kwrds)-> dict:
      #return required params for searching starting from known user input
      raise NotImplementedError()

    def get_data(self,*args):
      #make api calls using the mapped inputs return and get result data
      raise NotImplementedError()

    def parse_output(self,data):
      #parse the result data to match standard api response shape
      raise NotImplementedError()



class UdemyProvider(BaseProvider):
  def get_data(self, skill, page, page_size, level, course_id):
    # Encode the client_id and client_secret in base64
    credentials = f"{self.UDEMY_CLIENT_ID}:{self.UDEMY_CLIENT_SECRET}"
    credentials_base64 = base64.b64encode(credentials.encode()).decode()
    
    # Use the correct Authorization header format
    headers = {"Authorization": f"Basic {credentials_base64}"}  
    
    # Use the skills and level from the URL parameters
    params = {"page": page, "page_size": page_size, "search": skill, "instructional_level": level}
    if course_id is not None:
       response = requests.get(
           f"https://www.udemy.com/api-2.0/courses/{course_id}/", headers=headers, params=params
       )
       udemy_course = response.json()
       # check if id is null
       if udemy_course.get("id") is None:
          raise exceptions.ValidationError({'course_id': ['Course with this id does not exist.']})
       return {"results": [udemy_course]}
    else:
       response = requests.get(
           "https://www.udemy.com/api-2.0/courses/", headers=headers, params=params
       )
       print("status code: ", response.status_code)
       # Filter the results to find the course with the matching ID
       count = response.json().get("results", []).count
       udemy_courses = response.json()
       return udemy_courses

  def map_inputs(self,**kwrds):
    # check level
    level = kwrds.get("level", 1)
    if level == 1:
        level = "beginner"
    elif level == 2:
        level = "intermediate"
    elif level == 3:
        level = "expert"
    else:
        raise exceptions.ValidationError({'level': ['Invalid level']})

    #check name 
    skill = kwrds.get("skill_title", None)
    if not skill:
        raise ValidationError("Skill with this id does not exist.")
    #get page
    page = kwrds.get("page", 1)
    page_size = kwrds.get("page_size", 10)
    course_id = kwrds.get("course_id", None)
    return {
        "skill": skill,
        "page": page,
        "page_size": page_size,
        "level": level,
        "course_id": course_id
    }
 

  def parse_output(self, data):
    # Calculate a relevance score for each course
    courses_info = [] 
    for course in data.get("results", []): 
        course_info = {
            "id": course.get("id", ""),
            "title": course.get("title", ""),
            "url": f"https://www.udemy.com{course.get('url', '')}",
            "price": course.get("price", ""),
            "is_paid": course.get("is_paid", ""),
            "price_detail": course.get("price_detail", ""),
            "description": course.get("headline", course.get("title", "")),
            "image_240x135": course.get("image_240x135", ""),
        }
        courses_info.append(course_info)
    courses_info.append({"count": data.get("count", 0),
                         "previous": data.get("previous", ""),
                         "next": data.get("next", "")})
    return courses_info  