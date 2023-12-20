from flask import Flask
from flask import request,make_response
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import sessionmaker
import sqlalchemy as db 
from sqlalchemy import Column,Integer,String
import jwt
import requests
from flask import jsonify
import json


engine=db.create_engine("sqlite:///products.sqlite")

conn=engine.connect()

metadata=db.MetaData()

products=db.Table('products',metadata,
                    db.Column('id',db.String(),primary_key=True),
                    db.Column('name',db.String(),nullable=False),
                    db.Column('description',db.String()),
                    db.Column('image',db.String()),
                    db.Column('price',db.Integer()),
                    db.Column('category',db.String()),
                    db.Column('discount',db.Integer()),
                    db.Column('gender',db.String()),
                    )

metadata.create_all(engine)

Base=declarative_base()
session=sessionmaker(bind=engine)()

app=Flask(__name__)

class Products(Base):
    __tablename__="products"
    
    id=Column(String,primary_key=True)
    name = Column(String)
    description=Column(String)
    image=Column(String)
    price=Column(Integer)
    category=Column(String)
    discount=Column(Integer)
    gender=Column(String)
    

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
    
    # def validate(self):
    #     val_account_no=len(str(self.account_no))==10 
    #     val_password=len(str(self.password))>6
    #     return val_account_no and val_password
    
class BaseException(Exception):
    status=400
    message=" "

    def __init__(self,status,message) ->None:
        super().__init__()
        self.status=status
        self.message=message

    def __str__(self):
        return str({'status':self.status,'message':self.message})
    

class ProductnotfoundError(BaseException):
    def __init__(self) ->None:
        super().__init__(404,"Invalid product or product not found")

# class BankholderNotPresent(BaseException):
#     def __init__(self) -> None:
#         super().__init__(404,"bankholder not present")

# class WithdrwalError(BaseException):
#     def __init__(self) -> None:
#         super().__init__(404,"Can't withdrawl money greater then deposit ammount")

# class DepositAmountError(BaseException):
#     def __init__(self) -> None:
#         super().__init__(404,"amount sholud not be negative")

# class AuthenticationError(BaseException):
#     def __init__(self) -> None:
#         super().__init__(404,"invalid password or username")


# class TokenGenerationError(BaseException):
#     def __init__(self) ->None:
#         super().init__(500,"unable to generate the token")    

@app.route("/api/products",methods=["POST"])
def create_product():
    newproduct=request.json
    productobj=Products(newproduct['id'],newproduct['name'],newproduct['description'],newproduct['image'],
                              newproduct['price'],newproduct['gender'],newproduct['category'],newproduct['discount'])

    # if not banks.validate():
    #     err=ValidationError()
    #     return str(err),err.status

    session.add(productobj)
    session.commit()
    return make_response(""),200

    

@app.route("/api/products",methods=["GET"])
def show_products():
    allproducts=session.query(products).all()
    return str(allproducts),200

    # product_details=session.query(products).Get(account_no=details['account_no']).first()
    # if not (account_details):
    #     err=BankholderNotPresent()
    #     return str(err),err.status
    # else:
    #     user=account_details
    # # if (details['name']!=user.name) and (details['password']!=user.password):
    # if (details['name']!=payload["user_name"]) and (details['password']!=payload["password"]):
    
    #     err=AuthenticationError()
    #     return str(err),err.status
    # if  details['amount']<=0:
    #     err=DepositAmountError()
    #     return str(err),err.status
    # accno=details['account_no']
    # acc=session.query(bankholders).filter_by(account_no=details['account_no']).first()
    # acc.balance=acc.balance +details['amount']
    
    # session.commit()

    

# @app.route("/api/bankholder/withdraw/",methods=["patch"])

# def withdrawl():
#     money=request.json
#     account_details=session.query(bankholders).filter_by(account_no=money['account_no']).first()

#     if not (account_details):
#         err=BankholderNotPresent()
#         return str(err),err.status
#     else:
#         curent=account_details
#     if (money['name']!=curent.name) and (money['password']!=curent.password):
#         err=AuthenticationError()
#         return str(err),err.status
    
#     if money['amount']>=curent.balance:
#         err=WithdrwalError()
#         return str(err),err.status
#     accno=money['account_no']
#     acc=session.query(bankholders).filter_by(account_no=money['account_no']).first()
#     acc.balance=acc.balance - money['amount']
#     session.commit()
    

#     return str(acc),200

@app.route("/api/products/<string:id>", methods=["DELETE"])
def delete_product(id):
    product = session.query(Products).filter_by(id=id).first()
    if not product:
        err = ProductnotfoundError()
        return str(err), err.status
    else:
        session.delete(product)
        session.commit()
        return make_response("", 200)

@app.route("/api/products/<id>", methods=["GET"])
def show_detail(id):
    product = session.query(Products).filter_by(id=id).first()
    if not product:
        err = ProductnotfoundError()
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
        err = ProductnotfoundError()
        return str(err), err.status

    for key, value in updated_product_data.items():
        setattr(product, key, value)

    session.commit() 
    return make_response("", 200)
    
   

   









    



