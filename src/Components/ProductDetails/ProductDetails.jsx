import React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import Product from '../Product/Product';

const ProductDetails = () => {
    const { productKey } = useParams();
    const productDetails = fakeData.find((product) => product.key === productKey);
    const { name, img, price, seller } = productDetails;
    return (
        <div>
            <h1>{productKey} details is here</h1>
            <Product name={name} img={img} price={price} seller={seller} showAddToCart={false} />
        </div>
    );
};

export default ProductDetails;
