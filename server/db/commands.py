import re
from sqlite3 import Error, Row
from typing import Dict, List

from server.db.connection import DB_Manager
from server.db.scripts import reformat_array_into_enumeration, make_template, make_expression
from server.exceptions.my_exceptions import MyException

AVAILABLE_TABLES = ['regions', 'cities', 'users', 'comments']


def validator(function):
    def wrapper_function(table_name, entity):
        if table_name not in AVAILABLE_TABLES:
            print(table_name, 'not available')
            return
        is_dangerous_code = re.match(r'\s(SELECT|INSERT|UPDATE|DELETE)\s', str(entity))
        if is_dangerous_code:
            return
        return function(table_name, entity)

    return wrapper_function


@validator
def insert(table_name, entity: Dict):
    connection = get_connection()
    try:
        cursor = connection.cursor()
        column_names = reformat_array_into_enumeration(list(entity.keys()))
        column_values = list(entity.values())
        template = make_template(len(column_values))

        sql = "INSERT INTO {} ({}) VALUES ({})".format(table_name, column_names, template)
        cursor.execute(sql, column_values)
        connection.commit()
        entities = select(table_name, entity)
        entity_id = entities[len(entities) - 1]['id']
        return entity_id
    except Error as error:
        raise MyException(error.args)
    finally:
        connection.close()


@validator
def delete(table_name, entity: Dict):
    connection = get_connection()
    try:
        cursor = connection.cursor()
        expression = make_expression(list(entity.keys()))
        column_values = list(entity.values())

        sql = "DELETE FROM {} WHERE {}".format(table_name, expression)
        cursor.execute(sql, column_values)
        connection.commit()
    except Error as error:
        raise MyException(error.args)
    finally:
        connection.close()


@validator
def select(table_name, entity: Dict, limit=0, condition=''):
    connection = get_connection()
    connection.row_factory = Row
    try:
        cursor = connection.cursor()
        if limit != 0:
            limit_sql = "LIMIT {}".format(int(limit))
        else:
            limit_sql = ''

        if entity == {}:
            cursor.execute("SELECT * FROM {} {}".format(table_name, limit_sql))
        else:
            column_values = list(entity.values())
            expression = make_expression(list(entity.keys()), condition)
            sql = "SELECT * FROM {} WHERE {} {}".format(table_name, expression, limit_sql)
            cursor.execute(sql, column_values)

        return cursor.fetchall()
    except Error as error:
        raise MyException(error.args)
    finally:
        connection.close()


def select_all(table_name):
    return select(table_name, {})


def get_by_id(table_name, entity_id):
    result = select(table_name, {'id': entity_id})
    if len(result):
        return dict(result[0])
    else:
        return dict()


def get_by_parameter(table_name, parameter_name, parameter_value):
    return select(table_name, {parameter_name: parameter_value})


def get_connection():
    db_manager = DB_Manager.get_instance()
    return db_manager.get_connection()


def execute_query(query, parameters: List):
    connection = get_connection()
    try:
        cursor = connection.cursor()
        cursor.execute(query, parameters)

        return cursor.fetchall()
    except Error as error:
        raise MyException(error.args)
    finally:
        connection.close()


def get_view_comment_by_id(view_id):
    query = """select u.name, u.surname, u.middle_name, u.number, u.email, r.name, c.name, com.text, com.id
            from comments com
            join users u on com.user_id = u.id
            join cities c on com.city_id = c.id
            join regions r on c.region_id = r.id
            where com.id = ?"""
    return execute_query(query, [view_id])[0]


def get_view_comments():
    query = """select u.name, u.surname, u.number, u.email, r.name, c.name, com.text, com.id
            from comments com
            join users u on com.user_id = u.id
            join cities c on com.city_id = c.id
            join regions r on c.region_id = r.id"""
    return execute_query(query, [])


def get_stat_regions(min_comments=0):
    query = """select region.name, count(*) from comments comment
                            JOIN cities city on comment.city_id = city.id
                            JOIN regions region on city.region_id = region.id
                        group by region.name having count(*) > ?"""
    return execute_query(query, [min_comments])


def get_stat_cities(region_name, min_comments=0):
    query = """select city.name, count(*) from cities city
                            JOIN regions region on region.id = city.region_id and region.name = ?
                            JOIN comments comment on city.id = comment.city_id
                        group by city.name having count(*) >= ?"""
    return execute_query(query, [region_name, min_comments])
