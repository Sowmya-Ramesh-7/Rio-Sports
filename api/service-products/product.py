from flask import Flask,session
from flask import request,make_response
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import sessionmaker
import sqlalchemy as db 
from sqlalchemy import Column,Integer,String
from flask import jsonify
from flask_cors import CORS
from flask_pymongo import PyMongo
import uuid

app = Flask(__name__)
CORS(app,origins='http://localhost:5173')

# app.config['Mongo_URI'] ='mongodb://localhost:27017/products'
# mongo =PyMongo(app)

mongo = PyMongo(app, uri='mongodb://localhost:27017/products')


# engine=db.create_engine("sqlite:///products.sqlite")

# conn=engine.connect()

# metadata=db.MetaData()

# products=db.Table('products',metadata,
#                     db.Column('id',db.String(),primary_key=True),
#                     db.Column('name',db.String(),nullable=False),
#                     db.Column('description',db.String()),
#                     db.Column('image',db.String()),
#                     db.Column('price',db.Integer()),
#                     db.Column('category',db.String()),
#                     db.Column('discount',db.Integer()),
#                     db.Column('gender',db.String()),
#                     )

# metadata.create_all(engine)

# Base=declarative_base()
# session=sessionmaker(bind=engine)()




    # __tablename__="products"
    
    # id=Column(String,primary_key=True)
    # name = Column(String)
    # description=Column(String)
    # image=Column(String)
    # price=Column(Integer)
    # category=Column(String)
    # discount=Column(Integer)
    # gender=Column(String)
    
class Products():
    def __init__(self,id,name,description,image,price,category,discount,gender):
        super().__init__()
        self.id=id
        self.name=name
        self.description=description
        self.image=image
        self.price=price
        self.category=category
        self.discount=discount
        self.gender=gender

    def __str__(self):
        return str({
            "id":self.id,
            "name":self.name,
            "description":self.description,
            "image":self.image,
            "price":self.price,
            "category":self.category,
            "discount":self.discount,
            "gender":self.gender
        })
    
    
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
        super().__init__(404,"Invalid product or product not found")


@app.route("/api/products",methods=["POST"])
def create_product():
    newproduct=request.form
    productobj=Products(str(uuid.uuid4()),newproduct['name'],newproduct['description'],"empty",newproduct['price'],newproduct['category'],newproduct['discount'],newproduct['gender'])
    session.add(productobj)
    session.commit()
    return make_response(""),200

    

@app.route("/api/products", methods=["GET"])
def show_products():
    all_products = session.query(Products).all()
    products_list = [
        {
            "name": product.name,
            "id": product.id,
            "description": product.description,
            "image": product.image,
            "price": product.price,
            "category": product.category,
            "discount": product.discount,
            "gender": product.gender
        }
        for product in all_products
    ]
    return jsonify(products_list), 200

@app.route("/api/products/?category=<category>", methods=["GET"])
def show_by_category(category):
    products = session.query(Products).filter_by(category=category).all()
    if not products:
        err = ProductNotFoundError()
        return str(err), err.status
    else:
        products_list = [
        {
            "name": product.name,
            "id": product.id,
            "description": product.description,
            "image": product.image,
            "price": product.price,
            "category": product.category,
            "discount": product.discount,
            "gender": product.gender
        }
        for product in products
    ]
    return jsonify(products_list), 200


@app.route("/api/products/<string:id>", methods=["DELETE"])
def delete_product(id):
    product = session.query(Products).filter_by(id=id).first()
    if not product:
        err = ProductNotFoundError()
        return str(err), err.status
    else:
        session.delete(product)
        session.commit()
        return make_response("", 200)


@app.route("/api/products/<id>", methods=["GET"])
def show_detail(id):
    product = session.query(Products).filter_by(id=id).first()
    if not product:
        err = ProductNotFoundError()
        return str(err), err.status
    else:
        # Convert the product object to a dictionary
        product_dict = {
            "name": product.name,
            "id": product.id,
            "description": product.description,
            "image": product.image,
            "price": product.price,
            "category": product.category,
            "discount": product.discount,
            "gender": product.gender
        }
        return jsonify(product_dict), 200
    

@app.route("/api/products/<id>", methods=["PATCH"])
def edit_products(id):
    updated_product_data = request.json
    product = session.query(Products).filter_by(id=id).first()

    if not product:
        err = ProductNotFoundError()
        return str(err), err.status

    for key, value in updated_product_data.items():
        setattr(product, key, value)

    session.commit() 
    return make_response("", 200)
    
app.run(debug=True)  

   









    



