import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import fakeData from '../../fakeData';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';

const Shop = () => {
    const first10 = fakeData.slice(0, 10);
    const [products] = useState(first10);
    const [cart, setCart] = useState([]);

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

    const handleAddProduct = (item) => {
        let count = 1;
        let newCart;
        const sameProduct = cart.find((pd) => pd.key === item.key);
        if (sameProduct) {
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter((pd) => pd.key !== item.key);
            newCart = [...others, sameProduct];
        } else {
            // eslint-disable-next-line no-param-reassign
            item.quantity = 1;
            newCart = [...cart, item];
        }
        setCart(newCart);
        addToDatabaseCart(item.key, count);
    };

    return (
        <div className="shop-container">
            <div className="product-container">
                {products.map((product) => (
                    <Product
                        name={product.name}
                        img={product.img}
                        price={product.price}
                        seller={product.seller}
                        productKey={product.key}
                        addProduct={handleAddProduct}
                        pd={product}
                        showAddToCart
                    />
                ))}
            </div>
            <div className="cart-info">
                <Cart cart={cart}>
                    <Link to="/cart">
                        <button type="button" className="addToCart">
                            Review Order
                        </button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;
