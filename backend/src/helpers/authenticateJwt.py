from jwt import encode, decode, exceptions

from datetime import datetime, timedelta

from os import getenv

secret_key = getenv("SECRET_KEY")

def expire_data(days:int):
    now = datetime.now()
    new_date = now + timedelta(days)
    return new_date

def write_token(data):
    token = encode(payload={**data, "exp":expire_data(2)}, algorithm="HS256", key=secret_key)
    return token.encode("UTF-8")

def validate_token(token, output=False):
    try:
        if output:
            return decode(token, algorithms=["HS256"], key=secret_key)

    except exceptions.DecodeError:
        return {"status":401, "message":"invalid_token"}
    
    except exceptions.ExpiredSignatureError:
        return {"status":401, "message":"token_expired"}