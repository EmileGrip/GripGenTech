from vectordb import vectordb
from schema.models import Occupation
def get_best_matched_occupation(job_title,num = 1):
    try:
        results = vectordb.search(job_title, k=num)
    except Exception as e:
        print(f"Error in searching for matching occupation: {e}")
        return None
    if len(results) < 1:
        return None
    else:
        print(f"found {len(results)} occupations")
    #get the found occupation 
    preferred_labels = [result.metadata["preferred_label"] for result in results]
    found_occupation = Occupation.nodes.filter(preferredLabel__in=preferred_labels)
    if num > 1:
        return found_occupation
    elif num == 1:
        return found_occupation[0]
    else:
        return None
  
   