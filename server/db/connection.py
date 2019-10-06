import os
import sqlite3
from sqlite3 import Error

from server.db.scripts import *


class DB_Manager:
    __ROOT_DIR = os.path.dirname(os.path.abspath(__file__))
    __FILENAME = __ROOT_DIR + '/test_data/{}.txt'
    __DB_PATH = __ROOT_DIR + '/feedback.db'
    __instance = None

    def __init__(self):
        if DB_Manager.__instance is None:
            if not os.path.isfile(self.__DB_PATH):
                self.__create_db()
                self.__fill_db()

    @classmethod
    def get_instance(cls):
        if cls.__instance is None:
            cls.__instance = DB_Manager()
        return cls.__instance

    def get_connection(self):
        return sqlite3.connect(self.__DB_PATH)

    def __create_db(self):
        connection = None
        try:
            connection = self.get_connection()
            cursor = connection.cursor()
            scripts = [CREATE_REGIONS_TABLE, CREATE_CITIES_TABLE, CREATE_USERS_TABLE, CREATE_COMMENTS_TABLE]
            for script in scripts:
                cursor.executescript(script)
            connection.commit()
        except Error as error:
            print(error)
        finally:
            if connection:
                connection.close()

    def __fill_db(self):
        try:
            for table_name, columns in TABLES.items():
                self.__fill_table(table_name, columns)
        except Error as error:
            print(error)

    def __fill_table(self, table_name, columns):
        connection = None
        try:
            connection = sqlite3.connect(self.__DB_PATH)
            cursor = connection.cursor()
            filename = self.__FILENAME.format(table_name)
            with open(filename, 'r') as file:
                for line in file:
                    values = line[:-1].split('\t')
                    template = make_template(len(columns))
                    params_sql = reformat_array_into_enumeration(columns)
                    # In this case, we can use formatting because we did not enter data from clients
                    # Malicious code cannot be entered
                    sql = "INSERT INTO {table_name}({params_sql}) VALUES ({template})".format(
                        table_name=table_name, params_sql=params_sql, template=template)
                    cursor.execute(sql, values)
            connection.commit()
        except Error as error:
            print(error, table_name)
        finally:
            if connection:
                connection.close()


if __name__ == '__main__':
    instance = DB_Manager.get_instance()
