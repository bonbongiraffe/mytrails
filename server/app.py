#!/usr/bin/env python3
from server.models import db, User, Hike, Trail
from flask_restful import Api, Resource
from flask import request, make_response, session, send_from_directory
from werkzeug.utils import secure_filename
import os

from server.config import app, api, db, UPLOAD_FOLDER, ALLOWED_EXTENSIONS

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# checking file upload type for users images
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/')
def index():
    return '<h1>My (Happy) Trails!</h1>'

# models
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
        trails = [t.to_dict(rules=('-hikes',)) for t in Trail.query.all()]
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
        
class HikesById(Resource):
    def delete(self,id):
        hike = Hike.query.filter_by(id=id).first()
        if not hike:
            return make_response({'error':'Hike not found'},400)
        db.session.delete(hike)
        db.session.commit()
        return make_response({'message':'Delete successful'},204)
    
    def patch(self,id):
        hike = Hike.query.filter_by(id=id).first()
        if not hike:
            return make_response({'error':'Hike not found'},400)
        data = request.get_json()
        for attr in data:
            setattr(hike,attr,data[attr])
        db.session.add(hike)
        db.session.commit()
        return make_response(hike.to_dict(),200)

# user login and auth
@app.route('/login', methods=["POST"])
def login():
    data = request.get_json()
    user = User.query.filter_by(username = data["username"]).first()
    if not user:
        return make_response({"error": "User not found"}, 400)
    if user.authenticate(data["password"]):
        session["user_id"] = user.id
        print(session["user_id"])
        return make_response(user.to_dict(only=('username','id', 'profile_image')), 200)
    else:
        return make_response({"error": "Incorrect password"}, 400)

@app.route('/signup', methods=["POST"])
def signup():
    # this is saving the form data because we are sending both JSON and file data(the image)
    username = request.form["username"]
    password = request.form["password"]
    image_file = request.files['image']

    # Handling Errors: this makes sure that the image file type is one of our allowed file types and makes sure that there is an image in the request
    if 'image' not in request.files or image_file.filename == '':
        return make_response({"error": "No image uploaded"}, 400)
    if not allowed_file(image_file.filename):
        return make_response({"error": "Invalid file type"}, 400)
    
    # getting the filename from the image_file metadata and then using werkzeug's secure_filename() to remove or replace any potentially harmful characters in the filename. Storing new sanitized filename in the filename variable.
    filename = secure_filename(image_file.filename)
    # combining multiple paths into a single path using python's os module. Helps ensure the appropriate path for different operating systems. 
    image_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    # save the image file to image_path
    image_file.save(image_path)

    try:
        new_user = User(
            username=username,
            password_hash=password,
            profile_image=f'https://mytrails-official-backend.onrender.com/{image_path}'
        )
        db.session.add(new_user)
        db.session.commit()
        session["user_id"] = new_user.id
        return make_response(new_user.to_dict(only=('username','id', 'profile_image')), 201)
    except ValueError as v_error:
        return make_response({"error":[v_error]}, 400)    

@app.route('/authorized', methods=["GET"])
def authorized():
    try:
        user = User.query.filter_by(id=session.get("user_id")).first()
        return make_response( user.to_dict(only=('username','id', 'profile_image')), 200)
    except:
        return make_response({"error": "Please log in or sign up"}, 401)

@app.route('/logout', methods=["DELETE"])
def logout():
    del session['user_id']
    return make_response({"message": "logout successful"}, 204)

@app.route('/static/<path:path>')
def send_static(path):
    return send_from_directory('static',path)

api.add_resource(Users,'/users')
api.add_resource(Trails,'/trails')
api.add_resource(Hikes,'/hikes')
api.add_resource(HikesById,'/hikes/<int:id>')

if __name__ == '__main__':
    app.run(port=5555, debug=True)

