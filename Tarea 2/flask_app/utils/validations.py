import re
import filetype
from database import db

def validate_type_product(type):
    if type == "fruta":
        return type
    elif type == "verdura":
        return type
    else:
        return False

def validate_product(product, type):
    if type == "fruta":
        for id in product:
            db.verificar_producto(id)
            if not db.verificar_producto(id) or id >= 38:
                return False
    elif type == "verdura":
        for id in product:
            db.verificar_producto(id)
            if not db.verificar_producto(id) or id <= 37:
                return False
    
    return product and len(product) < 6 and len(product) > 0

def validate_description(description):
    regex = re.compile(r'^[a-zA-Z0-9 .]+$')
    return description and regex.match(description)

        
        
