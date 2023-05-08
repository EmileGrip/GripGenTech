from django.db import models
from django.db.models.base import ModelBase

def getModel(perfix,prototype):
     
    class MyClassMetaclass(models.base.ModelBase):
        def __new__(cls, name, bases, attrs):
            name =  f"{str.lower(perfix)}_{str.lower(name)}"
            return models.base.ModelBase.__new__(cls, name, bases, attrs)

    class MyClass(prototype):
        __metaclass__ = MyClassMetaclass
        
        class Meta:
            db_table = f"{str.lower(perfix)}_{prototype.__name__.lower()}"
            proxy = True

    return MyClass