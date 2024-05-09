import re
import filetype
from database import db

def validate_type_product(product_type):
    if product_type == "fruta":
        return product_type
    elif product_type == "verdura":
        return product_type
    else:
        return False

def validate_product(product, product_type):
    if product_type == "fruta":
        for id in product:
            if int(id).isdigit() and int(id) <= 37:
                if not db.verificar_tipo_verdura_fruta(id) or id >= 38:
                    return False
            else:
                return False
    elif product_type == "verdura":
        for id in product:
            if int(id).isdigit() and 38 <= int(id) <= 64:
                if not db.verificar_tipo_verdura_fruta(id) or id <= 37:
                    return False
            else:
                return False
    return True

def validate_quantity_prods(products):
    if len(products) > 5:
        return False
    elif len(products) <= 0:
        return False
    else:
        return True
    
def validate_products(products, product_type):
    if not validate_type_product(product_type):
        return False
    if not validate_product(products, product_type):
        return False
    if not validate_quantity_prods(products):
        return False
    return True

def cleantext(text):
    return re.sub(r"[^a-zA-Z0-9 ]", "", text)

def validate_region_comuna(region_id, comuna_id):
    if region_id.isdigit() and comuna_id.isdigit():
        if not db.verificar_comuna_region(region_id, comuna_id):
            return False
    else:
        return True
    
def validate_nombre_productor(nombre_productor):
    nombre = cleantext(nombre_productor)
    if 3 <= len(nombre) <= 80:
        return True
    else:
        return False

def validate_email(email):
    # Eliminar espacios en blanco al principio y al final
    email = email.strip()
    
    # Eliminar caracteres no deseados y verificar formato
    email_limpio = re.sub(r'[^\w@.+-]', '', email)
    formato_valido = re.match(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$', email_limpio)
    
    if formato_valido:
        return email_limpio
    else:
        return None
    
def validate_celular(celular):
    # Eliminar espacios en blanco al principio y al final
    celular = celular.strip()
    
    # Eliminar caracteres no deseados y verificar formato
    celular_limpio = re.sub(r'[^\d]', '', celular)
    formato_valido = re.match(r'^\d{9}$', celular_limpio)
    
    if formato_valido:
        if 9 <= len(celular_limpio) <=  15:
            return celular_limpio
        else:
            return None
    else:
        return None
    
def validate_form(nombre_productor, email, celular, region_id, comuna_id, products, product_type):
    if not validate_nombre_productor(nombre_productor):
        print("Nombre productor")
        return False
    if not validate_email(email):
        print("Email")
        return False
    if not validate_celular(celular):
        print("Celular")
        return False
    if not validate_region_comuna(region_id, comuna_id):
        print("Region comuna")
        return False
    if not validate_products(products, product_type):
        print("Products")
        return False
    return True



    

        
        
