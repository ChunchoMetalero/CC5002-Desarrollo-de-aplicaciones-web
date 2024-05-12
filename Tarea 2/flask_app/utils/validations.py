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
            try:
                valor = int(id)
                if int(id) and int(id) <= 37:
                    if not db.verificar_tipo_verdura_fruta(id) or int(id) >= 38:
                        return False
                else:
                    return False
            except:
                return False
    elif product_type == "verdura":
        for id in product:
            try:
                valor = int(id)
                if int(id) and 38 <= int(id) <= 64:
                    if not db.verificar_tipo_verdura_fruta(id) or int(id) <= 37:
                        return False
                else:
                    return False
            except:
                return False
    return True

def validate_len_prods(products):
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
    if not validate_len_prods(products):
        return False
    return True

def cleantext(text):
    return re.sub(r"[^a-zA-Z0-9 ]", "", text)

def validate_region_comuna(region_id, comuna_id):
    if region_id.isdigit() and comuna_id.isdigit():
        if not db.verificar_comuna_region(comuna_id, region_id):
            return False
        else:
            return True
    else:
        return False
    
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
    if celular.isdigit() and 9 <= len(celular) <= 15:
        return True
    elif celular == "":
        return True
    else:
        return False
    
def validate_images(archivos):
    ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "gif"}
    ALLOWED_MIMETYPES = {"image/jpeg", "image/png", "image/gif"} 

    # check if the browser submitted more than 3 files
    if len(archivos) > 3:
        return False
    
    # check if the browser submitted an empty file
    for archivo in archivos:
        if archivo is None:
            return False

        # check if the browser submitted an empty file
        if archivo.filename == "":
            return False

        # check file extension
        ftype_guess = filetype.guess(archivo)
        if not ftype_guess:
            return False
        else:
            if ftype_guess.extension not in ALLOWED_EXTENSIONS:
                return False
            # check mimetype
            if ftype_guess.mime not in ALLOWED_MIMETYPES:
                return False     
            
    return True
    
def validate_form(nombre_productor, email, celular, region_id, comuna_id, products, product_type, archivos):
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
    if not validate_images(archivos):
        print("Images")
        return False
    return True





    

        
        
