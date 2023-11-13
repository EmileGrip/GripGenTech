from neomodel import db
from django.conf import settings
import openai

def calculate_embedding(text):
    openai.api_key = settings.OPENAI_API_KEY
    response = openai.Embedding.create(
        input=text,
        engine="text-embedding-ada-002")
    return response["data"][0]['embedding']

def get_best_matched_occupation(job_title,num = 1):
    try:
        vector = calculate_embedding(job_title)
        query = f"""CALL db.index.vector.queryNodes(
        'occupation_embeddings',
        {num},
        {vector}
        )
        YIELD node, score
        RETURN node
        ORDER BY score DESC"""
        results , _ = db.cypher_query(query, resolve_objects=True)
    except Exception as e:
        print(f"Error in searching for matching occupation: {e}")
        return None
    if len(results) < 1:
        return None
    else:
        print(f"found {len(results)} occupations")
        results = [result[0] for result in results]
    #get the found occupation 
    if num > 1:
        return results
    elif num == 1:
        return results[0]
    else:
        return None
  
   