from flask import Flask
from flask import request,make_response
from flask import jsonify
from bson.objectid import ObjectId
from flask_cors import CORS
from flask_pymongo import PyMongo
from pymongo import MongoClient
import os
import uuid
import cloudinary
import cloudinary.uploader
import cloudinary.api
from flask import session

from dotenv import load_dotenv
load_dotenv()


app = Flask(__name__)
CORS(app,origins='http://localhost:5173')


client = MongoClient("mongodb://localhost:27017/")
db = client["RioFashion"]

from functools import wraps


def is_logged_in(func):
    @wraps(func)
    def decorated_function(*args, **kwargs):
        if 'user' in session:
            return func(*args, **kwargs)
        else:
            return make_response("Unauthorized"), 401
    return decorated_function

class Products():
    def __init__(self,name,description,image,price,category,discount,gender):
        super().__init__()
        self.name=name
        self.description=description
        self.image=image
        self.price=price
        self.category=category
        self.discount=discount
        self.gender=gender

    def to_dict(self):
        return {
            "name":self.name,
            "description":self.description,
            "image":self.image,
            "price":self.price,
            "category":self.category,
            "discount":self.discount,
            "gender":self.gender
        }
        
class ProductDAO:
    def __init__(self, db):
        self.collection = db.products

    def create_product(self, product):
        result = self.collection.insert_one(product.to_dict())
        return str(result.inserted_id)

    def get_product(self, product_id):
        return self.collection.find_one({"_id": ObjectId(product_id)})

    def update_product(self, product_id, new_data):
        new_data.pop('_id', None)
        result = self.collection.update_one({"_id": ObjectId(product_id)}, {"$set": new_data})
        return result.modified_count > 0

    def delete_product(self, product_id):
        result = self.collection.delete_one({"_id": ObjectId(product_id)})
        return result.deleted_count > 0
    
    def get_all_products(self):
        return list(self.collection.find({}))
    
    def get_products_by_category(self, category):
        return list(self.collection.find({"category": category}))
    
product_dao = ProductDAO(db)
    
class BaseException(Exception):
    status=400
    message=" "

    def __init__(self,status,message) ->None:
        super().__init__()
        self.status=status
        self.message=message

    def __str__(self):
        return str({'status':self.status,'message':self.message})
    

class ProductNotFoundError(BaseException):
    def __init__(self) ->None:
        super().__init__(404,"Invalid product or Products not found")


@app.route("/api/products",methods=["POST"])
@is_logged_in
def create_product():
    newproduct=request.form
    
    #storing file in local storage
    file = request.files['image']
    
    #storing image to cloudinary
    cloudinary.config(cloud_name = os.getenv('CLOUD_NAME'), api_key=os.getenv('API_KEY'), 
    api_secret=os.getenv('API_SECRET'))
    
    upload_result = cloudinary.uploader.upload(file, public_id=f"rio_Fashion_DEV/image_{str(uuid.uuid4())}")
    print(upload_result['url'])
    new_product=Products(newproduct['name'],newproduct['description'],upload_result['url'],newproduct['price'],newproduct['category'],newproduct['discount'],newproduct['gender'])
    product_dao.create_product(new_product)
    return make_response(""),200

    

@app.route("/api/products", methods=["GET"])
def show_products():
    all_products = product_dao.get_all_products()
    if not all_products:
        err = ProductNotFoundError()
        return str(err), err.status
    products_list = [{**product,'_id':str(product['_id'])} for product in all_products]
    return jsonify(products_list), 200

@app.route("/api/products/?category=<category>", methods=["GET"])
def show_by_category(category):
    products = product_dao.get_products_by_category(category)
    if not products:
        err = ProductNotFoundError()
        return str(err), err.status
    else:
        return jsonify(products), 200


@app.route("/api/products/<string:id>", methods=["DELETE"])
def delete_product(id):
    if not product_dao.delete_product(id):
        err = ProductNotFoundError()
        return str(err), err.status
    else:
        return make_response("", 200)


@app.route("/api/products/<id>", methods=["GET"])
def show_detail(id):
    product = product_dao.get_product(id)
    if not product:
        err = ProductNotFoundError()
        return str(err), err.status
    else: 
        return jsonify({**product,'_id':str(product['_id'])}), 200
    

@app.route("/api/products/<id>", methods=["PUT"])
def edit_products(id):

    updated_product = request.form.to_dict()

    if 'image' in request.files:
        file = request.files['image']

        cloudinary.config(
            cloud_name=os.getenv('CLOUD_NAME'),
            api_key=os.getenv('API_KEY'),
            api_secret=os.getenv('API_SECRET')
        )
        upload_result = cloudinary.uploader.upload(file, public_id=f"rio_Fashion_DEV/image_{str(uuid.uuid4())}")
        updated_product['image'] = upload_result['url']
        print(updated_product,"++++",upload_result)

    modified = product_dao.update_product(id, updated_product)

    if not modified:
        err = ProductNotFoundError()
        return str(err), err.status

    return make_response("", 200)

    
app.run(debug=True,port=5000)  

   









    



