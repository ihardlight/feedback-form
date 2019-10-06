TABLES = {'cities': ['name', 'region_id'],
          'regions': ['code', 'name'],
          'users': ['name', 'surname', 'middle_name', 'number', 'email'],
          'comments': ['user_id', 'city_id', 'text']}

CREATE_REGIONS_TABLE = """
            create table regions (
                id INTEGER not null
                    constraint regions_pk
                        primary key autoincrement,
                code INTEGER,
                name VARCHAR(255) not null
            );
            
            create unique index regions_id_uindex
                on regions (id);
        
            """

CREATE_CITIES_TABLE = """
            create table cities (
                id INTEGER not null
                    constraint cities_pk
                        primary key autoincrement,
                name      VARCHAR(255) not null,
                region_id INTEGER      not null
                    references regions
                        on update cascade on delete cascade
            );
            
            create unique index cities_id_uindex on cities (id);
            
            """

CREATE_USERS_TABLE = """
            create table users (
                id INTEGER not null
                    constraint users_pk
                        primary key autoincrement,
                surname     VARCHAR(50) not null,
                name        VARCHAR(50) not null,
                middle_name VARCHAR(50) not null,
                number      VARCHAR(15),
                email       VARCHAR(255)
            );
            
            create unique index users_id_uindex
                on users (id);
            """

CREATE_COMMENTS_TABLE = """
            create table comments (
                id  INTEGER not null
                    constraint comments_pk
                        primary key autoincrement,
                text TEXT    not null,
                user_id INTEGER not null
                    references users
                        on update cascade on delete cascade,
                city_id INTEGER not null
                    references cities
                        on update cascade on delete cascade
            );
            
            create unique index comments_id_uindex
                on comments (id);
            """


def reformat_array_into_enumeration(array):
    """
    reformat array of strings in one string
    ex: ['param1', 'param2' ...] to "param1, param2 ..."
    """
    return str(array)[1:-1].replace("'", "")


def make_template(size):
    """
    make template with '?' for SQL queries (for VALUES)
    Ex. VALUES (?, ?, ?, ?) for size=4
    :param size: array of values
    :return: template
    """
    return ', '.join(['?' for i in range(size)])


def make_expression(array, condition: str = ''):
    """
    make template with '?' for SQL queries (for WHERE)
    :param array: array of values
    :param condition: addition conditions
    :return: expression
    """
    return ' AND '.join([str(param) + "=? " for param in array]) + condition
