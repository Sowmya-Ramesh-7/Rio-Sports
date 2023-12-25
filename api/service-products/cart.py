from flask import Flask,render_template,request,redirect,url_for
from flask_pymongo import PyMongo
from flask import session



app=Flask(__name__)

app.config['Mongo_URI'] ='mongodb://localhost:27017'
mongo =PyMongo(app)

class product:
    def __init__(self,id,name,price):
        self.id=id
        self.name=name
        self.price=price


 #displaying products
@app.route('/cart/product_display')    
def index():
    products=mongo.db.products.find()
    return render_template('index.html',products=products)


#adding items to cart
@app.route('/cart/add_to_cart/<product_id>')
def add_to_cart(product_id):
    product= mongo.db.products.find_one_or_404({'_id': product_id})

    cart=session.get('cart',[])

    cart.append({'product_id':str(product['id']),'name':product['name'],'price':product['price']})


    session['cart']=cart

    return redirect(url_for('index'))


 #removing items from cart
@app.route('/cart/remove_from_cart/<product_id>')
def remove_from_cart(product_id):
    product= mongo.db.products.find_one_or_404({'_id': product_id})

    cart=session.get('cart',[])

    cart.remove({'product_id':str(product['id']),'name':product['name'],'price':product['price']})


    session['cart']=cart

    return redirect(url_for('index'))


#displaying the cart items
@app.route('/cart/display')
def view_cart():
    cart = session.get('cart', [])
    return render_template('cart.html', cart=cart)

if __name__ == '__main__':
    app.run(debug=True)







