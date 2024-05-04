import pymysql
import json

DB_NAME = "tarea2"
DB_USERNAME = "cc5002"
DB_PASSWORD = "programacionweb"
DB_HOST = "localhost"
DB_PORT = 3306
DB_CHARSET = "utf8"

with open('database/querys.json', 'r') as querys:
	QUERY_DICT = json.load(querys)
	

def get_conn():
    conn = pymysql.connect(
        db=DB_NAME,
        user=DB_USERNAME,
        passwd=DB_PASSWORD,
        host=DB_HOST,
        port=DB_PORT,
        charset=DB_CHARSET
    )
    return conn

# -- querys --

def obtener_lista_frutas():
    try :
        conn = get_conn()
        cursor = conn.cursor()
        cursor.execute(QUERY_DICT['obtener_lista_frutas'])
        frutas = cursor.fetchall()
        return frutas
    except Exception as e:
        print(e)
        return None
    finally:
        cursor.close()
        conn.close()

def obtener_lista_verduras():
    try :
        conn = get_conn()
        cursor = conn.cursor()
        cursor.execute(QUERY_DICT['obtener_lista_verduras'])
        verduras = cursor.fetchall()
        return verduras
    except Exception as e:
        print(e)
        return None
    finally:
        cursor.close()
        conn.close()

def obtener_lista_regiones():
    try :
        conn = get_conn()
        cursor = conn.cursor()
        cursor.execute(QUERY_DICT['obtener_lista_regiones'])
        regiones = cursor.fetchall()
        return regiones
    except Exception as e:
        print(e)
        return None
    finally:
        cursor.close()
        conn.close()

def obtener_lista_comunas(region_id):
    try :
        conn = get_conn()
        cursor = conn.cursor()
        cursor.execute(QUERY_DICT['obtener_comunas_region'], (region_id,))
        comunas = cursor.fetchall()
        return comunas
    except Exception as e:
        print(e)
        return None
    finally:
        cursor.close()
        conn.close()

def insertar_producto(tipo, descripcion, comuna_id, nombre_productor, email_productor, celular_productor):
    try :
        conn = get_conn()
        cursor = conn.cursor()
        cursor.execute(QUERY_DICT['insertar_producto'], (tipo, descripcion, comuna_id, nombre_productor, email_productor, celular_productor))
        conn.commit()
        cursor.execute(QUERY_DICT['obtener_ultimo_id_producto'])
        id_producto = cursor.fetchone()[0]
        return id_producto
    except Exception as e:
        print(e)
    finally:
        cursor.close()
        conn.close()

def insertar_producto_verdura_fruta(producto_id, tipo_verdura_fruta_id):
    try :
        conn = get_conn()
        cursor = conn.cursor()
        cursor.execute(QUERY_DICT['insertar_producto_verdura_fruta'], (producto_id, tipo_verdura_fruta_id))
        conn.commit()
    except Exception as e:
        print(e)
    finally:
        cursor.close()
        conn.close()

def insertar_fotos_producto(ruta_archivo, nombre_archivo, producto_id):
    try :
        conn = get_conn()
        cursor = conn.cursor()
        cursor.execute(QUERY_DICT['insertar_fotos_producto'], (ruta_archivo, nombre_archivo, producto_id))
        conn.commit()
    except Exception as e:
        print(e)
    finally:
        cursor.close()
        conn.close()
    





