from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    "uq": "uq_%(table_name)s_%(column_0_name)s",
    "ck": "ck_%(table_name)s_%(constraint_name)s",
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy(metadata=metadata)

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String)
    _password_hash = db.Column(db.String)

    @property # <-- need bcrypt hashing, property getter, setter, and authentication methods
    def password_hash(self):
        pass

    #relationships
    hikes = db.relationship('Hike',back_populates='user')
    trails = association_proxy('hikes','trail')

    #serialize rules
    serialize_rules = ('-hikes.user','-trails.user',)

    #validations

    def __repr__(self):
        pass

class Trail(db.Model, SerializerMixin):
    __tablename__ = 'trails'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    location = db.Column(db.String)
    park = db.Column(db.String)

    @property # <-- aggregate method: calculates average of perceived difficulty from all associated hikes
    def difficulty(self):
        pass

    #relationships
    hikes = db.relationship('Hike',back_populates='trail')
    users = association_proxy('hikes','user')

    #serialize rules
    serialize_rules = ('-hikes.trail','users.trail',)

    #validations

    def __repr__(self):
        pass

class Hike(db.Model, SerializerMixin):
    __tablename__ = 'hikes'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    trail_id = db.Column(db.Integer, db.ForeignKey('trails.id'))
    difficulty = db.Column(db.Integer) # <-- perceived difficulty

    #relationships
    user = db.relationship('User',back_populates='hikes')
    trail = db.relationship('Trail',back_populates='trails')

    #serialize rules
    serialize_rules = ('-user.hikes','-trail.hikes',)

    #validations

    def __repr__(self):
        pass