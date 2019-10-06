# -*- coding: utf-8 -*-
import os
import http.server as server
from http.server import CGIHTTPRequestHandler

port = 8000


class RequestHandler(CGIHTTPRequestHandler):
    def translate_path(self, path):
        """For paths starting with /cgi-bin/, serve from cgi_dir"""
        paths = path.split("/")
        if len(paths) > 1 and paths[0] == "" and paths[1] not in ['server', 'client', 'cgi-bin']:
            return os.path.join('', 'index.html')
        return CGIHTTPRequestHandler.translate_path(self, path)


server_address, handler = ("", port), RequestHandler
httpd = server.HTTPServer(server_address, handler)
print(("Server running on port http://localhost:{}.".format(server_address[1])))
httpd.serve_forever()
