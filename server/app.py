#!/usr/bin/env python3

from models import db, User, Hike, Trail
from flask_migrate import Migrate
from flask_restful import Api, Resource
from flask import Flask, request, make_response
import os

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATABASE = os.environ.get(
    "DB_URI", f"sqlite:///{os.path.join(BASE_DIR, 'app.db')}")

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

migrate = Migrate(app, db)
db.init_app(app)
api = Api(app)

@app.route('/')
def index():
    return '<h1>Happy Trails!</h1>'

class Users(Resource):
    def get():
        users = [u.to_dict() for u in User.query.all()]
        return make_response( users, 200 )

    def post():
        data = request.get_json()
        try:
            new_user = User(
                username = data['username'],
                password_hash = data['password']
            )
            db.session.add(new_user)
            db.session.commit()
            return make_response(new_user.to_dict(),201)
        except ValueError as v_error:
            return make_response({'errors':[v_error]},400)

api.add_resource(Users,'/users')

if __name__ == '__main__':
    app.run(port=5555, debug=True)

