from neomodel import db


def getNodeByID(label,id):
    results,_ = db.cypher_query(
        f"MATCH (n:"+label+") WHERE ID(n)="+str(id)+" RETURN n",
        None,
        resolve_objects=True
    )
    if len(results) == 0:
        return None
    return results[0][0]
    
def get_node_id(node):
    #split element_id 
    return node.element_id.split(":")[-1]

def get_non_none_dict(**d):
    return {k: v for k, v in d.items() if v not in [None,""]}

def filter_request(data):
    
    if not data in [None,""]:
        if type(data) == str:
            return data.strip()
        elif type(data) == list:
            return [filter_request(item) for item in data]
        elif type(data) == dict:
            response = {}
            for key, value in data.items():
                if not value in [None,""]:
                    response[key] = filter_request(value)
            return response
        else:
            return data
    else:
        return data