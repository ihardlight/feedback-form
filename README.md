# Feed back form project
Demo-version for collecting and managing feedback from clients

## Installation
Just run 
```
python3 app.py 
```
Project will be start on http://localhost:8000

## About technologies
The whole application have written on pure JavaScript and Python3. 
Only default libraries

## Advantages
The client side works reactive. Only once load index.html 
and update the content page if needed. Manual changes in URL also handles. 

The server side uses <b>sqlite 3</b> database. 
All request resolves thought one SQL query because database is simple.

Also some high-level commands provides to make more difficult queries.

Application satisfy [PEP 333 WSGI standard](https://www.python.org/dev/peps/pep-0333/) 

## Database
If you do not have a database named feedback.db it will be created based on test data.

![Database](./UML%20diagram.png "UML")
