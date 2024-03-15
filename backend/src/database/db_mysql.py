from flask_mysqldb import MySQL
from os import getenv
# configuracion base de datos
  
mysql = MySQL()

def init_db(app):

    mysql.init_app(app)


def get_db():

    connection = mysql.connection

    return connection

      

     

