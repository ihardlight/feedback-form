from server.db.commands import insert, select
from server.db.scripts import TABLES
from server.exceptions.my_exceptions import MyException
from server.services.services import view_comments, stat_regions, select_all, get_cities_by_region_id, \
    get_view_by_comment_id, delete_comment, stat_cities


def json_rpc2(function):
    def wrapper_function(request, action):
        result = function(request, action)
        result['jsonrpc'] = '2.0'
        return result

    return wrapper_function


def handler(function):
    def wrapper_function(request, action):
        try:
            response = function(request, action)
            result = {'result': response}
            return result
        except (MyException, RuntimeError) as exception:
            error = {'error': str(exception)}
            return error

    return wrapper_function


@json_rpc2
@handler
def not_found(request, action):
    raise MyException({'code': 404, 'message': "Sorry, this page does not exist."})


@json_rpc2
@handler
def add_comment(request, action):
    user = {key: request.getfirst(key, 'default') for key in TABLES['users']}
    found_user = select('users', user)
    if len(found_user) == 0:
        user_id = insert('users', user)
    else:
        user_id = found_user[0]['id']

    comment = {key: request.getfirst(key, '') for key in TABLES['comments']}
    comment['user_id'] = user_id
    comment['city_id'] = request.getfirst('city', 0)
    comment_ids = insert('comments', comment)

    return comment_ids


@json_rpc2
@handler
def view(request, action):
    comment_id = request.getfirst('id')
    if comment_id is not None:
        return get_view_by_comment_id(comment_id)
    return view_comments()


@json_rpc2
@handler
def delete_view(request, action):
    view_id = request.getfirst('id')
    if view_id is not None:
        return delete_comment(view_id)
    return False


@json_rpc2
@handler
def stat(request, action):
    stat_param = request.getfirst('stat-name')
    min_comments = int(request.getfirst('min-comments'))
    if stat_param == 'region':
        regions_comments = stat_regions(min_comments)
        return regions_comments
    if stat_param == 'city':
        region_name = request.getfirst('region-name')
        city_comments = stat_cities(region_name, min_comments)
        return city_comments
    return 'wrong stat name'


@json_rpc2
@handler
def send_regions(request, action):
    regions = select_all('regions')
    return [dict(region) for region in regions]


@json_rpc2
@handler
def send_cities(request, action):
    region_id = request.getfirst('region_id')
    cities = get_cities_by_region_id(region_id)
    return [dict(city) for city in cities]


# Map
URLS = [
    (r'^comment$', add_comment),
    (r'^delete-view$', delete_view),
    (r'^view$', view),
    (r'^stat$', stat),
    (r'load-regions$', send_regions),
    (r'load-cities$', send_cities),
    (r'.+', not_found)
]
