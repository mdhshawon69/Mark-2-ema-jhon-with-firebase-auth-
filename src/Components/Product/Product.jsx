import React from 'react';
import { Link } from 'react-router-dom';
import './Product.css';

const Product = ({ name, img, price, seller, addProduct, productKey, pd, showAddToCart }) => (
    <div className="product-item">
        <div className="product-image">
            <img src={img} alt="" />
        </div>
        <div className="product-info">
            <h3 className="name">
                <Link to={`/product/${productKey}`}>{name}</Link>
            </h3>
            <p className="price">${price}</p>
            <p className="seller">
                <small>By : {seller}</small>
            </p>
            {showAddToCart && (
                <button className="addToCart" type="button" onClick={() => addProduct(pd)}>
                    Add to cart
                </button>
            )}
        </div>
    </div>
);

export default Product;
