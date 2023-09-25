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