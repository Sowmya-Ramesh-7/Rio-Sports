import {useState} from 'react';
import './CartBtns.css'
export default function CartBtns(){
    const [quantity, setQuantity] = useState(0)
    return (
        <div className='cartBtns'>
            <button onClick={() => setQuantity((quantity) => quantity + 1)} className="btn btn-outline-dark">+</button> 
            <div className='quantity'>
                <input type="number" disabled name="quantity" min="0" className="form-control quantity" value={quantity}/>
            </div>
            <button onClick={() => setQuantity((quantity) =>quantity===0?0:quantity - 1)} className="btn btn-dark">-</button>
        </div>
    );
}