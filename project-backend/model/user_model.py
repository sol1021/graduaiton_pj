from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime

db = SQLAlchemy()

class Users(db.Model):    
    __tablename__ = 'users'
    
    userId = db.Column(db.String(20), primary_key=True, nullable=False)
    passWord = db.Column(db.String(20, 'utf8mb4_unicode_ci'))
    
    def __init__(self, userId, passWord):
        self.userId = userId
        self.passWord = passWord

class Records(db.Model):
    __tablename__ = 'records'
   
    id = db.Column(db.Integer,primary_key=True, autoincrement=True)
    user_id = db.Column(db.String(20), ForeignKey('users.userId'), nullable=False)

    left_ratio = db.Column(db.String(20, 'utf8mb4_unicode_ci'))
    right_ratio = db.Column(db.String(20, 'utf8mb4_unicode_ci'))
    top_ratio = db.Column(db.String(20, 'utf8mb4_unicode_ci'))
    smile_ratio = db.Column(db.String(20, 'utf8mb4_unicode_ci'))
    noSmile_ratio = db.Column(db.String(20, 'utf8mb4_unicode_ci'))
    record_date = db.Column(db.DateTime, default=datetime.today())
    user_rec = relationship('Users', foreign_keys='Records.user_id')

    def __init__(self, user_id, left_ratio, right_ratio, top_ratio, smile_ratio, noSmile_ratio):
        self.user_id = user_id
        self.left_ratio = left_ratio
        self.right_ratio = right_ratio
        self.top_ratio = top_ratio
        self.smile_ratio = smile_ratio
        self.noSmile_ratio = noSmile_ratio




    
      