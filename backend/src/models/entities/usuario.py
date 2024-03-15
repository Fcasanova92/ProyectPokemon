from flask import jsonify

class Usuario:

    def __init__(self, name, surname, username, email, password):

        self.name = name
        self.surname = surname        
        self.username = username
        self.email = email
        self.password = password

    def to_json(self):

        return {

        "name":  self.name,
        "surname": self.surname ,       
        "username": self.username,
        "email" : self.email,
        "password" : self.password
        }
