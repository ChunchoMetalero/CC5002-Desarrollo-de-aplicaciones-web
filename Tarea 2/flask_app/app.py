from flask import Flask, request, render_template, redirect, url_for, jsonify
from utils.validations import *
from database import db
from werkzeug.utils import secure_filename
from datetime import datetime
import hashlib
import filetype
import os

UPLOAD_FOLDER = 'static/uploads'

app = Flask(__name__)

app.secret_key = "s3cr3t_k3y"

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1000 * 1000 # 16 MB

@app.errorhandler(413)
def request_entity_too_large(error):
    return 'File exceeds the maximum file size allowed', 413

@app.route("/", methods=["GET"])
def index():
    return render_template("app/index.html")

@app.route("/agregar-producto", methods=["GET", "POST"])
def agregar_producto():
    if request.method == "POST":
        tipo = request.form.get("tipo-producto")
        productos = request.form.getlist("Producto")
        descripcion = request.form.get("Descripcion")
        archivos = request.files.getlist("Imagen")
        comuna = request.form.get("Comunas")
        nombre_productor = request.form.get("Nombre-Productor")
        email_productor = request.form.get("email-productor")
        telefono_productor = request.form.get("telefono-productor")

        last_id = db.insertar_producto(tipo, descripcion, comuna, nombre_productor, email_productor, telefono_productor)

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

        return index()
    
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
    comunas = db.obtener_lista_comunas(region_id)
    for comuna in comunas:
        comuna_dict = {
            "id": comuna[0],
            "nombre": comuna[1]
        }
        data.append(comuna_dict)
    return jsonify(data)

# Gets Ver-Productos

@app.route("/get-productos", methods=["GET"])
def get_productos():
    page = request.args.get("page")
    data = []

    info_prods = db.obtener_ultimos_productos_info(int(page))
    prods = db.obtener_ultimos_productos(int(page))
    fotos = db.obtener_ulltimas_fotos(int(page))

    productos_dict = {}

    # Agrupar la información de cada producto por su id_prod
    for info_prod in info_prods:
        id_prod = info_prod[0]
        productos_dict[id_prod] = {
            "tipo": info_prod[1],
            "comuna": info_prod[2],
            "region": info_prod[3],
            "frutas_verduras": [],
            "fotos": []
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
            "fotos": info["fotos"]
        }
        data.append(producto)

    return jsonify(data)

@app.route("/producto", methods=["GET"])
def producto():
    id_prod = request.args.get("id_prod")
    data = []

    info_prod = db.obtener_info_prod(int(id_prod))
    prods = db.obtener_tvf_prod(int(id_prod))
    fotos = db.obtener_fotos_prod(int(id_prod))

    productos_dict = {}

    productos_dict[id_prod] = {
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
        productos_dict[id_prod]["frutas_verduras"].append(prod[1])

    for foto in fotos:
        productos_dict[id_prod]["fotos"].append({"ruta": foto[0], "nombre_foto": foto[1]})

    data.append(productos_dict[id_prod])
    return jsonify(data)

@app.route("/informacion-producto", methods=["GET"])
def informacion_producto():
    return render_template("app/informacion-producto.html")


    


if __name__ == "__main__":
    app.run(debug=True)