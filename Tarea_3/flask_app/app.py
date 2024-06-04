from flask import Flask, request, render_template, redirect, url_for, jsonify
from utils.validations import *
from utils.pages import *
from database import db
from werkzeug.utils import secure_filename
from datetime import datetime
from PIL import Image
import hashlib
import filetype
import os

UPLOAD_FOLDER = 'static/uploads'
UPLOAD_FOLDER_120 = 'static/uploads/120x120'
UPLOAD_FOLDER_640 = 'static/uploads/640x480'
UPLOAD_FOLDER_1280 = 'static/uploads/1280x1024'
sizes = [(120, 120), (640,480 ), (1280, 1024)]



app = Flask(__name__)

app.secret_key = "s3cr3t_k3y"

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1000 * 1000 # 16 MB
app.config['UPLOAD_FOLDER_120'] = UPLOAD_FOLDER_120
app.config['UPLOAD_FOLDER_640'] = UPLOAD_FOLDER_640
app.config['UPLOAD_FOLDER_1280'] = UPLOAD_FOLDER_1280

@app.errorhandler(400)
def bad_request(error):
    return error400()

@app.errorhandler(413)
def request_entity_too_large(error):
    return 'File exceeds the maximum file size allowed', 413

@app.errorhandler(404)
def page_not_found(error):
    return error404()

@app.errorhandler(400)
def error400():
    return render_template("app/error400.html")

@app.route("/error404", methods=["GET"])
def error404():
    return render_template("app/error404.html")

@app.route("/", methods=["GET"])
def index():
    return render_template("app/index.html")

@app.route("/<status>", methods=["GET", "POST"])
def index_param(status):
    if status == "success":
        return render_template("app/index.html", status=str(status))
    else:
        return error404()

@app.route("/agregar-producto", methods=["GET", "POST"])
def agregar_producto():
    if request.method == "POST":
        tipo = request.form.get("tipo-producto")
        productos = request.form.getlist("Producto")
        descripcion = request.form.get("Descripcion")
        c_desc = cleantext(descripcion)
        archivos = request.files.getlist("Imagen")
        region = request.form.get("Regiones")
        comuna = request.form.get("Comunas")
        nombre_productor = request.form.get("Nombre-Productor")
        nombre = cleantext(nombre_productor)
        email_productor = request.form.get("email-productor")
        telefono_productor = request.form.get("telefono-productor")

        if validate_form(nombre, email_productor, telefono_productor, region, comuna, productos, tipo, archivos):

            last_id = db.insertar_producto(tipo, c_desc, comuna, nombre, email_productor, telefono_productor)

            for producto in productos:
                db.insertar_producto_verdura_fruta(last_id, producto)

            current_datetime = datetime.now().strftime("%d%m%Y%H%M%S") 

            for archivo in archivos:
                _filename = hashlib.sha256(
                    secure_filename(archivo.filename + current_datetime) # nombre del archivo
                    .encode("utf-8") # encodear a bytes
                    ).hexdigest()
                _extension = filetype.guess(archivo).extension
                img_filename = f"{_filename}.{_extension}"

                archivo.save(os.path.join(app.config["UPLOAD_FOLDER"], img_filename))
                db.insertar_fotos_producto(app.config["UPLOAD_FOLDER"], img_filename, last_id)

                for size in sizes:
                    if size == (120, 120):
                        with Image.open(os.path.join(app.config["UPLOAD_FOLDER"], img_filename)) as img:
                            resized_img = img.resize(size)
                            resized_img.save(os.path.join(app.config["UPLOAD_FOLDER_120"], img_filename))
                    elif size == (640, 480):
                        with Image.open(os.path.join(app.config["UPLOAD_FOLDER"], img_filename)) as img:
                            resized_img = img.resize(size)
                            resized_img.save(os.path.join(app.config["UPLOAD_FOLDER_640"], img_filename))
                    elif size == (1280, 1024):
                        with Image.open(os.path.join(app.config["UPLOAD_FOLDER"], img_filename)) as img:
                            resized_img = img.resize(size)
                            resized_img.save(os.path.join(app.config["UPLOAD_FOLDER_1280"], img_filename))
                    
            return index_param("success")
        else:
            return error400()
    
    elif request.method == "GET":
        return render_template("app/agregar-producto.html")
    
@app.route("/ver-productos", methods=["GET"])
def ver_productos():
    return render_template("app/ver-productos.html")
    
# Gets Form Agregar Producto
    
@app.route("/frutas", methods=["GET"])
def frutas():
    data = []
    frutas = db.obtener_lista_frutas()
    for fruta in frutas:
        fruta_dict = {
            "id": fruta[0],
            "nombre": fruta[1]
        }
        data.append(fruta_dict)
    return jsonify(data)

@app.route("/verduras", methods=["GET"])
def verduras():
    data = []
    verduras = db.obtener_lista_verduras()
    for verdura in verduras:
        verdura_dict = {
            "id": verdura[0],
            "nombre": verdura[1]
        }
        data.append(verdura_dict)    
    return jsonify(data)

@app.route("/regiones", methods=["GET"])
def regiones():
    data = []
    regiones = db.obtener_lista_regiones()
    for region in regiones:
        region_dict = {
            "id": region[0],
            "nombre": region[1]
        }
        data.append(region_dict)
    return jsonify(data)

@app.route("/comunas", methods=["GET"])
def comunas():
    data = []
    region_id = request.args.get("region_id")
    if region_id.isdigit() and 1 <= int(region_id) <= 16 :
        region = int(region_id)
        comunas = db.obtener_lista_comunas(region)
        for comuna in comunas:
            comuna_dict = {
                "id": comuna[0],
                "nombre": comuna[1]
            }
            data.append(comuna_dict)
        return jsonify(data)
    else:
        error400()

# Gets Ver-Productos

@app.route("/get-productos", methods=["GET"])
def get_productos():
    page = request.args.get("page")
    cantidad = db.obtener_cantidad_productos()
    if page.isdigit() and 1 <= int(page) <= pages(int(cantidad)):
        pagina= int(page)
        data = []

        info_prods = db.obtener_ultimos_productos_info(int(pagina))
        prods = db.obtener_ultimos_productos(int(pagina))
        fotos = db.obtener_ulltimas_fotos(int(pagina))

        productos_dict = {}

        # Agrupar la información de cada producto por su id_prod
        for info_prod in info_prods:
            id_prod = info_prod[0]
            productos_dict[id_prod] = {
                "tipo": info_prod[1],
                "comuna": info_prod[2],
                "region": info_prod[3],
                "frutas_verduras": [],
                "fotos": [],
            }

        # Agregar la información de frutas o verduras para cada producto
        for prod in prods:
            id_prod = prod[0]
            productos_dict[id_prod]["frutas_verduras"].append(prod[1])

        # Agregar la información de las fotos para cada producto
        for foto in fotos:
            id_prod = foto[0]
            productos_dict[id_prod]["fotos"].append({"ruta": foto[1], "nombre_foto": foto[2]})

        # Convertir el diccionario en una lista para la respuesta JSON
        for id_prod, info in productos_dict.items():
            producto = {
                "id_prod": id_prod,
                "tipo": info["tipo"],
                "comuna": info["comuna"],
                "region": info["region"],
                "frutas_verduras": info["frutas_verduras"],
                "fotos": info["fotos"],
                "cantidad": cantidad
            }
            data.append(producto)

        return jsonify(data)
    
    else:
        return error404()
    
@app.route("/get-pedidos", methods=["GET"])
def get_pedidos():
    page = request.args.get("page")
    cantidad = db.obtener_cantidad_pedidos()
    if page.isdigit() and 1 <= int(page) <= pages(int(cantidad)):
        pagina = int(page)
        data = []

        info_pedidos = db.obtener_ultimos_pedidos_info(int(pagina))
        pedidos = db.obtener_ultimos_pedidos(int(pagina))

        pedidos_dict = {}

        for info_pedido in info_pedidos:
            id_pedido = info_pedido[0]
            pedidos_dict[id_pedido] = {
                "tipo": info_pedido[1],
                "comuna": info_pedido[2],
                "region": info_pedido[3],
                "nombre_comprador": info_pedido[4],
                "frutas_verduras": []
            }
        
        for pedido in pedidos:
            id_pedido = pedido[0]
            pedidos_dict[id_pedido]["frutas_verduras"].append(pedido[1])
        
        for id_pedido, info in pedidos_dict.items():
            pedido = {
                "id_pedido": id_pedido,
                "tipo": info["tipo"],
                "comuna": info["comuna"],
                "region": info["region"],
                "nombre_comprador": info["nombre_comprador"],
                "frutas_verduras": info["frutas_verduras"],
                "cantidad": cantidad
            }
            data.append(pedido)
        
        return jsonify(data)
    else:
        return error404()

@app.route("/producto", methods=["GET"])
def producto():
    id_prod = request.args.get("id_prod")
    cantidad = db.obtener_cantidad_productos()

    if id_prod == None:
        return error404()

    elif id_prod.isdigit() and 1 <= int(id_prod) <= cantidad:
        id_producto = int(id_prod)
        data = []

        info_prod = db.obtener_info_prod(int(id_producto))
        prods = db.obtener_tvf_prod(int(id_producto))
        fotos = db.obtener_fotos_prod(int(id_producto))

        productos_dict = {}

        productos_dict[id_producto] = {
            "tipo": info_prod[1],
            "comuna": info_prod[2],
            "region": info_prod[3],
            "productor": info_prod[4],
            "email": info_prod[5],
            "telefono": info_prod[6],
            "descripcion": info_prod[7],
            "frutas_verduras": [],
            "fotos": []
            
        }
        for prod in prods:
            productos_dict[id_producto]["frutas_verduras"].append(prod[1])

        for foto in fotos:
            productos_dict[id_producto]["fotos"].append({"ruta": foto[0] , "nombre_foto": foto[1]})

        data.append(productos_dict[id_producto])
        return jsonify(data)
    else:
        return error404()


@app.route("/informacion-producto", methods=["GET"])
def informacion_producto():
    return render_template("app/informacion-producto.html")

@app.route("/agregar-pedido", methods=["GET", "POST"])
def agregar_pedido():
    if request.method == "POST":
        tipo = request.form.get("tipo-producto")
        productos = request.form.getlist("Producto")
        descripcion = request.form.get("Descripcion")
        c_desc = cleantext(descripcion)
        region = request.form.get("Regiones")
        comuna = request.form.get("Comunas")
        nombre_comprador = request.form.get("Nombre-Comprador")
        nombre = cleantext(nombre_comprador)
        email_comprador = request.form.get("email-Comprador")
        telefono_comprador = request.form.get("telefono-Comprador")

        if validate_pedido(nombre_comprador, email_comprador, telefono_comprador, region, comuna, productos, tipo):
            last_id = db.insertar_pedido(tipo, c_desc, comuna, nombre, email_comprador, telefono_comprador)
            
            for producto in productos:
                db.insertar_pedido_verdura_fruta(last_id, producto)
            
            return index_param("success")
        else:
            return error400()

    elif request.method == "GET":
        return render_template("app/agregar-pedido.html")

@app.route("/ver-pedidos", methods=["GET"])
def ver_pedidos():
    return render_template("app/ver-pedidos.html")


@app.route("/pedido", methods=["GET"])
def pedido():
    id_pedido = request.args.get("id_pedido")
    cantidad = db.obtener_cantidad_pedidos()

    if id_pedido == None:
        return error404()

    elif id_pedido.isdigit() and 1 <= int(id_pedido) <= cantidad:
        id_pedido = int(id_pedido)
        data = []

        info_pedido = db.obtener_info_pedido(int(id_pedido))
        prods = db.obtener_tvf_pedido(int(id_pedido))

        pedido_dict = {
            "tipo": info_pedido[1],
            "comuna": info_pedido[2],
            "region": info_pedido[3],
            "nombre": info_pedido[4],
            "email": info_pedido[5],
            "telefono": info_pedido[6],
            "descripcion": info_pedido[7],
            "frutas_verduras": []
        }

        for prod in prods:
            pedido_dict["frutas_verduras"].append(prod[1])

        data.append(pedido_dict)
        return jsonify(data)
    else:
        return error404()

@app.route("/informacion-pedido", methods=["GET"])
def informacion_pedido():
    return render_template("app/informacion-pedido.html")

@app.route("/stats", methods=["GET"])
def ver_estadisticas():
    return render_template("app/stats.html")
    
@app.route("/stats-productos", methods=["GET"])
def stats_productos():
    data = []
    productos = db.prod_stats()
    for producto in productos:
        producto_dict = {
            "tipo": producto[0],
            "cantidad": producto[1]
        }
        data.append(producto_dict)
    return jsonify(data)

@app.route("/stats-pedidos", methods=["GET"])
def stats_pedidos():
    data = []
    pedidos = db.pedido_stats()
    for pedido in pedidos:
        pedido_dict = {
            "comuna": pedido[0],
            "cantidad": pedido[1]
        }
        data.append(pedido_dict)
    return jsonify(data)


if __name__ == "__main__":
    app.run(debug=True)