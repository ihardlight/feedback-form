from server.db.commands import *
from server.exceptions.my_exceptions import MyException


def get_cities_by_region_id(region_id):
    return get_by_parameter('cities', 'region_id', region_id)


def delete_comment(comment_id):
    try:
        delete('comments', {'id': comment_id})
        return True
    except MyException:
        return False


def get_view_by_comment_id(comment_id):
    pattern = ['name', 'surname', 'middle_name', 'number', 'email', 'region', 'city', 'text', 'id']
    return dict(zip(pattern, get_view_comment_by_id(comment_id)))


def view_comments():
    pattern = ['name', 'surname', 'number', 'email', 'region', 'city', 'text', 'id']
    return [dict(zip(pattern, view)) for view in get_view_comments()]


def stat_regions(min_comments=0):
    return {key: value for [key, value] in get_stat_regions(min_comments)}


def stat_cities(region_name, min_comments=0):
    return {key: value for [key, value] in get_stat_cities(region_name, min_comments)}
