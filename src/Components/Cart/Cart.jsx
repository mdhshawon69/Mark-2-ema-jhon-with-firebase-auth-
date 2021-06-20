import React from 'react';
import './Cart.css';

const Cart = ({ cart, children }) => {
    const grandTotal = cart
        .reduce((total, product) => total + product.price * product.quantity, 0)
        .toFixed(2);
    const tax = Math.round(grandTotal / 5);
    let shippingCharge = 0;

    if (grandTotal < 15) {
        shippingCharge = 0;
    } else if (grandTotal < 35) {
        shippingCharge = 4.99;
    } else if (grandTotal < 100) {
        shippingCharge = 12.99;
    }
    const allTotal = Math.round(Number(grandTotal) + tax + shippingCharge);
    return (
        <div className="cart-container">
            <div className="cart-title">
                <h2>Products Summary</h2>
                <h4>Number of product : {cart.length}</h4>
            </div>
            <p>
                <b>
                    <small>Product Price : {grandTotal}$</small>
                </b>
            </p>
            <p>
                <b>
                    <small>Shipping Charge : {shippingCharge}$</small>
                </b>
            </p>
            <p>
                <b>
                    <small>Tax + VAT : {tax}$</small>
                </b>
            </p>

            <h3 className="total">Total : {allTotal}$</h3>
            <br />
            {children}
        </div>
    );
};
export default Cart;
