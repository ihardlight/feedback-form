import json
from random import randint as rnd

with open('jokes.txt') as jokes_file:
    jokes_list = json.load(jokes_file)

with open('comments.txt', 'w') as comments_file:
    with open('cities.txt') as cities_file:
        cities_num = len([city for city in cities_file])
    with open('users.txt') as users_file:
        users_num = len([user for user in users_file])
    print(cities_num, users_num)

    for ind, joke in enumerate(jokes_list):
        city_ind = rnd(1, cities_num)
        user_ind = rnd(1, users_num)
        comments_file.write('{}\t{}\t{}\n'.format(user_ind, city_ind, joke))
