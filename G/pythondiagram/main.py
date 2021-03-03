import flask
from flask import request
from flask_cors import CORS
from draw import draw

server = flask.Flask(__name__)

CORS(server)
@server.route('/python/diagram',methods=['POST'])
def create():
    lists=request.get_json()
    draw().test(lists)
    return "ok"

if __name__ == '__main__':
    server.run()
