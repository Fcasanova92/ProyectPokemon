from src.database.db_mysql import get_db


class usuarioModel:

    @classmethod
    def create_Usuario(data):
         
         connection = get_db()

         cursor = connection.cursor()
         
         sql = "INSERT INTO `user_poke_app`.`user` (`id`,`name`, `surname`, `username`, `email`, `passwords`) VALUES (NULL, %s,%s,%s,%s,%s);"

         cursor.execute(sql,data)

         connection.commit()   

         connection.close()


    @staticmethod
    def get_Usuario():
        
        connection = get_db()

        cursor = connection.cursor() 

        sql = "SELECT * FROM `user_poke_app`.`user`;"

        cursor.execute(sql)

        query_data = cursor.fetchall()

        print(query_data)

        connection.commit()

        return query_data
    
    @staticmethod
    def get_UserByFilter(filter, value):

        print("pass")

        connection = get_db()

        cursor = connection.cursor()

        sql = f"SELECT ID FROM `user_poke_app`.`user` WHERE {filter} = '{value}' ;"

        cursor.execute(sql)

        query_Data = cursor.fetchall()

        connection.commit()

        connection.close()

        return query_Data