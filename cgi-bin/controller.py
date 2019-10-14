#!/usr/bin/env python3
# -*- coding: utf-8 -*-
from os.path import dirname, abspath
import cgi
import json
import re
import sys

sys.path.insert(1, dirname(dirname(abspath(__file__))))

from server.controller.router import URLS


def application(request):
    action = request.getfirst("action", "")
    for regex, callback in URLS:
        match = re.search(regex, action)
        if match is not None:
            return callback(request, action)
    return ""


form = cgi.FieldStorage()
response = json.dumps(application(form))

print('Content-type: application/json\n')
print(response)
