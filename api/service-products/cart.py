from flask import Flask,render_template,request,redirect,url_for,make_response
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
from flask import session
from pymongo import MongoClient

app = Flask(__name__)

client = MongoClient("mongodb://localhost:27017/")
db = client["RioFashion"]


class Cart:
    def __init__(self,product,quantity):
        self.product=product,
        self.quantity=quantity,

    def to_dict(self):
        return {
            "product":self.product,
            "quantity": self.quantity
        }
        



class CartDAO:

    def __init__(self, db):
        self.collection = db.user

    def add_to_cart(self, user_id, data):
        result = self.collection.update_one({"_id": ObjectId(user_id)}, {"$set":data})
        return str(result.inserted_id)
    
    def remove_from_cart(self, user_id, data):
        result = self.collection.update_one({"_id": ObjectId(user_id)}, {"$set":data})
        return str(result.inserted_id)

    def get_user(self, user_id):
        return self.collection.find_one({"_id": ObjectId(user_id)})

    

cart_dao = CartDAO(db)

 #displaying products
# @app.route('/api/<user_id>/cart',methods=["GET"])    
# def index():
#     products=mongo.db.products.find({})
#     return str(products)                                     

#adding items to cart
@app.route('/api/<user_id>/cart/<product_id>',methods=["POST"])
def add_to_cart(user_id,product_id):
    user= cart_dao.get_user(user_id)
    if(user):
        cart=user['cart']
        for item in cart:
            if item['product']==product_id:
                item['quantity']+=1
                break
        else:
            item=Cart(product_id,1)
            cart.push(item.to_dict())


    cart_dao.add_to_cart(user_id,cart)
    return  make_response(""),200

@app.route('/api/<user_id>/cart/<product_id>',methods=["DELETE"])
def remove_from_cart(user_id,product_id):
    user= cart_dao.get_user(user_id)
    if(user):
        cart=user['cart']
        for item in cart:
            if item['product']==product_id:
                item['quantity']-=1
                if(item['quantity']==0):
                    cart.remove(item)
                break
        else:
            # no item found
            pass
    cart_dao.remove_from_cart(user_id,cart)
    return  make_response(""),200
 #removing items from cart
# @app.route('/api/<user_id>/cart/<product_id>',methods=["DELETE"])
# def remove_from_cart(product_id):
#     product= mongo.db.products.find_one_or_404({'_id': product_id})
#     cart=session.get('cart',[])

#     cart.remove({'product_id':str(product['id']),'name':product['name'],'price':product['price']})


#     session['cart']=cart

#     return str(product)


# #displaying the cart items
@app.route('/api/<user_id>/cart',methods=["GET"])
def view_cart(user_id):
    user= cart_dao.get_user(user_id)
    if(user):
        cart=user['cart']
        if(cart.size==0):
            return make_response(""),400
    
    return  str(cart),200

if __name__ == '__main__':
    app.run(debug=True,port=5001)







