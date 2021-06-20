import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import fakeData from '../../fakeData';
import {
    getDatabaseCart,

    // eslint-disable-next-line prettier/prettier
    removeFromDatabaseCart
} from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewProduct from '../ReviewProduct/ReviewProduct';
import './CartDeatils.css';

const CartDetails = () => {
    const [cart, setCart] = useState([]);
    const history = useHistory();

    useEffect(() => {
        const savedProduct = getDatabaseCart();
        const savedKey = Object.keys(savedProduct);
        const cartProducts = savedKey.map((key) => {
            const product = fakeData.find((pd) => pd.key === key);
            product.quantity = savedProduct[key];
            return product;
        });
        setCart(cartProducts);
    }, []);

    const proceedCheckout = () => {
        history.push('shipment');
    };
    const removeProduct = (productKey) => {
        const newCart = cart.filter((pd) => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    };

    return (
        <div className="shop-container">
            <div className="products-part">
                {cart.map((pd) => (
                    <ReviewProduct pd={pd} key={pd.key} removeProduct={removeProduct} />
                ))}
            </div>
            <div className="cart-info">
                <Cart cart={cart}>
                    <button type="button" className="addToCart" onClick={proceedCheckout}>
                        Proceed Checkout
                    </button>
                </Cart>
            </div>
        </div>
    );
};

export default CartDetails;
