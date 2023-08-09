import pandas as pd
from thefuzz import fuzz
from thefuzz import process
from schema.models import Occupation
from neomodel import db
from django.core.cache import cache

exceptions = [
    "and",
    "as",
    "as if",
    "as long as",
    "at",
    "but",
    "by",
    "even if",
    "for",
    "from",
    "if",
    "if only",
    "in",
    "into",
    "like",
    "near",
    "now that",
    "nor",
    "of",
    "off",
    "on",
    "on top of",
    "once",
    "onto",
    "or",
    "out of",
    "over",
    "past",
    "so",
    "so that",
    "than",
    "that",
    "till",
    "to",
    "up",
    "upon",
    "with",
    "when",
    "yet",
]


def get_labels(df_occupations):
    df_altlabels = (
        df_occupations[["conceptUri", "preferredLabel", "altLabels"]]
        .set_index(["conceptUri", "preferredLabel"])
        .apply(lambda x: x.str.split("\n").explode())
        .reset_index()
    )

    altlabels = df_altlabels.altLabels.unique()
    preferredlabels = df_altlabels.preferredLabel.unique()

    return altlabels, preferredlabels


def titleize(text, exceptions=exceptions):
    """
    Titleizes text by replacing words with their first letter capitalized, except for the exceptions.
    """
    text = text.split()
    # Capitalize every word that is not on "exceptions" list
    for i, word in enumerate(text):
        if word.isupper():
            text[i] = word
        else:
            text[i] = word.title() if word not in exceptions or i == 0 else word
    # Capitalize first word no matter what
    return " ".join(text)


def find_label(name, preferredlabels, altlabels):
    """
    Finds the label for a given Occupation URI
    """

    # First, try to find a match with the preferred labels with a score > 80
    match1 = process.extractOne(name, preferredlabels)

    # Second, try to find a match with the altlabels
    match2 = process.extractOne(name, altlabels)

    # Return the best match
    if match1[1] > match2[1]:
        return match1[0]
    elif match2[1] > 80:
        return match2[0]
    else:
        return None
        # In the app, perhaps just return the best match even if score < 80


def get_best_matched_occupation(job_title):
    occupations = cache.get('occupations')
    altlabels, preferredlabels = occupations["altlabels"], occupations["preferredlabels"]
    found_label = find_label(job_title, preferredlabels, altlabels)
    if found_label:
        occ_list = []
        selected_occupation = None
        found_occupation,_ = db.cypher_query(
            f"MATCH (s:Occupation) where s.altLabels contains '{found_label}' or   s.preferredLabel contains '{found_label}' return s",
            None, 
            resolve_objects=True
        )
        for occ in found_occupation:
            print(occ)
            occ_list.append(Occupation(**occ[0].__dict__))

        for occ in occ_list:
            score = fuzz.ratio(found_label, occ.preferredLabel)
            if selected_occupation is not None:
                if score > selected_occupation["score"]:
                    selected_occupation = {"occupation": occ, "score": score}
            else:
                selected_occupation = {"occupation": occ, "score": score}
    return selected_occupation["occupation"]
   