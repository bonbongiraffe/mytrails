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
    serialize_rules = ('-hikes.user','-trails.user','-_password_hash',)

    #validations

    def __repr__(self):
        return f'<username:{self.username}>'

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
        return f'<name:{self.name}, location:{self.location}, park:{self.park}>'

class Hike(db.Model, SerializerMixin):
    __tablename__ = 'hikes'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    trail_id = db.Column(db.Integer, db.ForeignKey('trails.id'))
    difficulty = db.Column(db.Integer) # <-- perceived difficulty

    #relationships
    user = db.relationship('User',back_populates='hikes')
    trail = db.relationship('Trail',back_populates='hikes')

    #serialize rules
    serialize_rules = ('-user.hikes','-trail.hikes',)

    #validations

    def __repr__(self):
        return f'<user_id:{self.user_id}, trail:{self.trail_id}, difficulty:{self.difficulty}>'