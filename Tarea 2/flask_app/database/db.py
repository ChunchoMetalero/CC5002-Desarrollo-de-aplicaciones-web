import pymysql
import json
from utils import pages

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

def obtener_cantidad_productos():
    try :
        conn = get_conn()
        cursor = conn.cursor()
        cursor.execute(QUERY_DICT['obtener_cantidad_productos'])
        cantidad = cursor.fetchone()[0]
        return cantidad
    except Exception as e:
        print(e)
        return None
    finally:
        cursor.close()
        conn.close()

def obtener_ultimos_productos_info(page):
    try :
        conn = get_conn()
        cursor = conn.cursor()
        cursor.execute(QUERY_DICT['obtener_ultimos_productos_info'], ((page-1)*5))
        productos = cursor.fetchall()
        return productos
    except Exception as e:
        print(e)
        return None
    finally:
        cursor.close()
        conn.close()

def obtener_ulltimas_fotos(page):
    cantidad = obtener_cantidad_productos()
    y = pages.products_in_page(page, cantidad)
    try :
        conn = get_conn()
        cursor = conn.cursor()
        cursor.execute(QUERY_DICT['obtener_ultimas_fotos'], (y[1],y[0],))
        productos = cursor.fetchall()
        return productos
    except Exception as e:
        print(e)
        return None
    finally:
        cursor.close()
        conn.close()

def obtener_ultimos_productos(page):
    cantidad = obtener_cantidad_productos()
    y = pages.products_in_page(page, cantidad)
    try :
        conn = get_conn()
        cursor = conn.cursor()
        cursor.execute(QUERY_DICT['obtener_ultimos_productos'], (y[1],y[0],))
        productos = cursor.fetchall()
        return productos
    except Exception as e:
        print(e)
        return None
    finally:
        cursor.close()
        conn.close()

def obtener_info_prod(producto_id):
    try :
        conn = get_conn()
        cursor = conn.cursor()
        cursor.execute(QUERY_DICT['obtener_info_prod'], (producto_id,))
        info_prod = cursor.fetchone()
        return info_prod
    except Exception as e:
        print(e)
        return None
    finally:
        cursor.close()
        conn.close()

def obtener_fotos_prod(producto_id):
    try :
        conn = get_conn()
        cursor = conn.cursor()
        cursor.execute(QUERY_DICT['obtener_fotos_prod'], (producto_id,))
        fotos = cursor.fetchall()
        return fotos
    except Exception as e:
        print(e)
        return None
    finally:
        cursor.close()
        conn.close()

def obtener_tvf_prod(producto_id):
    try :
        conn = get_conn()
        cursor = conn.cursor()
        cursor.execute(QUERY_DICT['obtener_tvf_prod'], (producto_id,))
        tvf = cursor.fetchall()
        return tvf
    except Exception as e:
        print(e)
        return None
    finally:
        cursor.close()
        conn.close()





