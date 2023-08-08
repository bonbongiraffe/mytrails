#!/usr/bin/env python3
from models import db, User, Hike, Trail
from flask_restful import Api, Resource
from flask import request, make_response, session

from config import app, api, db

@app.route('/')
def index():
    return '<h1>Happy Trails!</h1>'

class Users(Resource):
    def get(self):
        users = [u.to_dict() for u in User.query.all()]
        return make_response( users, 200 )

    def post(self):
        data = request.get_json()
        try:
            new_user = User(
                username = data['username'],
                password_hash = data['password']
            )
            db.session.add(new_user)
            db.session.commit()
            #session['user_id'] = new_user.id # <-- cookie
            return make_response(new_user.to_dict(),201)
        except ValueError as v_error:
            return make_response({'errors':[v_error]},400)

class Trails(Resource):
    def get(self):
        trails = [t.to_dict() for t in Trail.query.all()]
        return make_response(trails,200)

class Hikes(Resource):
    def get(self):
        hikes = [h.to_dict() for h in Hike.query.all()]
        return make_response(hikes,200)

    def post(self):
        data = request.get_json()
        try:
            new_hike = Hike(
                user_id = data["user_id"],
                trail_id = data["trail_id"],
                difficulty = data["difficulty"],
                rating = data["rating"],
                review = data["review"]
            )
            db.session.add(new_hike)
            db.session.commit()
            return make_response(new_hike.to_dict(),201)
        except ValueError as v_error:
            return make_response({'errors':[v_error]},400)

api.add_resource(Users,'/users')
api.add_resource(Trails,'/trails')
api.add_resource(Hikes,'/hikes')

if __name__ == '__main__':
    app.run(port=5555, debug=True)

