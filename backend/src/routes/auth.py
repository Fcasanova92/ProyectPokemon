from flask import Blueprint
from flask import  request, jsonify
from src.models.usuarioModel import usuarioModel
from src.helpers import authenticateJwt


routes_auth = Blueprint("routes_auth", __name__)

@routes_auth.route('/register', methods=["POST"])
def register():

    # obtener mail y username de la base de datos utilizando como filtro el email y el username de la respuesta. Armar dos variables, las cuales enviaremos dentro de un objeto, y lo recibira un nuevo state en el front

    data = request.json

    emailBBDD = usuarioModel().get_UserByFilter('email', data['email'] )

    usernameBBDD = usuarioModel().get_UserByFilter('usuario', data['username'])


    if len(emailBBDD) == 0 and len(usernameBBDD) == 0:

        dataUser = list(data.values())

        # este JWT debe de guardarse en la base de datos, de manera que, al realizar un logeo podamos chequear en el back.

        userJwt = authenticateJwt.write_token(data)

        usuarioModel().create_Usuario(dataUser)

        return {'registerValid': True, 'Token':userJwt }, 200


    
    elif len(emailBBDD) != 0 and len(usernameBBDD) == 0:

        return {'emailInvalid':True,
                
                 'registerValid':False}, 401
    
    elif len(emailBBDD) == 0 and len(usernameBBDD) != 0:

        return  {'usernameInvalid':True,
                
                 'registerValid':False}, 401
    
    else:

        return { 'emailInvalid':True,
            
            'usernameInvalid':True,
    
                'registerValid':False}, 401
            
    # si ambas condiciones anteriores son true, entonces se realiza la inyeccion, con el mensaje de respuesta recibido

@routes_auth.route('/getall', methods=["GET"])
def getall():

    data = usuarioModel.get_Usuario()

    return jsonify(data), 200