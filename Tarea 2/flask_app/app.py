from flask import Flask, request, render_template, redirect, url_for, jsonify
from utils.validations import *
from database import db
from werkzeug.utils import secure_filename
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
        comuna = request.form.get("Comunas")
        nombre_productor = request.form.get("Nombre-Productor")
        email_productor = request.form.get("email-productor")
        telefono_productor = request.form.get("telefono-productor")

        last_id = db.insertar_producto(tipo, descripcion, comuna, nombre_productor, email_productor, telefono_productor)

        for producto in productos:
            db.insertar_producto_verdura_fruta(last_id, producto)
    
        return index()
    
    elif request.method == "GET":
        return render_template("app/agregar-producto.html")
    
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


if __name__ == "__main__":
    app.run(debug=True)