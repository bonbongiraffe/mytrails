from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.ext.associationproxy import association_proxy

from config import db, bcrypt

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False)
    _password_hash = db.Column(db.String)
    profile_image = db.Column(db.String, default=None)


    @property
    def password_hash(self):
        return self._password_hash
        #raise Exception('Password hashes may not be viewed.')

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))

    #relationships
    hikes = db.relationship('Hike',back_populates='user')
    trails = association_proxy('hikes','trail')

    #serialize rules
    serialize_rules = ('-hikes.user','-trails.users','-_password_hash',)

    #validations
    @validates('username')
    def validate_username(self,key,new_username):
        if not 1 <= len(new_username) <= 25:
            raise ValueError('Username must be between 1 and 25 characters')
        return new_username

    def __repr__(self):
        return f'<username:{self.username}>'

class Trail(db.Model, SerializerMixin):
    __tablename__ = 'trails'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    location = db.Column(db.String)
    park = db.Column(db.String)

    @property # <-- aggregate method: calculates average of perceived difficulty from all associated hikes
    def difficulty(self):
        pass

    #relationships
    hikes = db.relationship('Hike',back_populates='trail')
    users = association_proxy('hikes','user')

    #serialize rules
    serialize_rules = ('-hikes.trail','-users.trails',)

    #validations

    def __repr__(self):
        return f'<name:{self.name}, location:{self.location}, park:{self.park}>'

class Hike(db.Model, SerializerMixin):
    __tablename__ = 'hikes'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    trail_id = db.Column(db.Integer, db.ForeignKey('trails.id'), nullable=False)
    difficulty = db.Column(db.Integer) # <-- perceived difficulty -/5
    rating = db.Column(db.Integer) # <-- enjoyment of hike -/5
    review = db.Column(db.String) # <-- user comments on hike

    #relationships
    user = db.relationship('User',back_populates='hikes')
    trail = db.relationship('Trail',back_populates='hikes')

    #serialize rules
    serialize_rules = ('-user.hikes','-trail.hikes',)

    #validations
    @validates('difficulty')
    def validate_difficulty(self,key,new_diffficulty):
        if not 1 <= new_diffficulty <= 5:
            raise ValueError('Difficulty must be between 1 and 5')
        return new_diffficulty

    def __repr__(self):
        return f'<user_id:{self.user_id}, trail:{self.trail_id}, difficulty:{self.difficulty}, rating:{self.rating}, review:{self.review}>'