from django.db import models
from django.db import connection
# Create your models here.
class multiModel():

    def __init__(self, prototype, perfix, connection_name='default.sqlite3') -> None:
        """
            @model_name: name of the new table object
            @table_name: name of the table with which it has to
                        be created in database
            @prototype: model which has to be used as prototype for
                        creating new table 

            @app_name: app for which table has to be created

            @connection: connection to be used


        """

        self.model_name = f"{str.lower(perfix)}_{str.lower(prototype.__name__)}"
        self.prototype = prototype
        self.app_name = "tenancy"
        self.connection = connection
        self.name_table_db = self.model_name


    def get(self):

        if self.__exists__():

            Model = self.__create_model__(create=False)


        else:

            Model = self.__create_model__()

        return Model



    def __exists__(self):

        with self.connection.cursor() as cursor:
            
            cursor.execute("show tables;")
            tables = [each[0] for each in cursor.fetchall()]

        result = False

        if self.name_table_db.lower() in tables:
            
            result = True

        return result

        



    def __create_model__(self, create = True):

        class Meta:
            pass

        setattr(Meta, "db_table", self.name_table_db)
        #self.db_table = f"{self.app_name}_{self.table_name}"

        fields = {}

        for field in self.prototype._meta.fields:

            fields[field.name] = field.clone()

        attrs = {'__module__':f"{self.app_name}.models", "Meta":Meta}
        self.attrs = attrs
        attrs.update(fields)


        model = type(self.model_name, (models.Model,), attrs)

        if create:
            
            with self.connection.schema_editor() as schema_editor: schema_editor.create_model(model)

        return model