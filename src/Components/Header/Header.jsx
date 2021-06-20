import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../images/logo.png';
import './Header.css';

const Header = () => (
    <div className="header">
        <a to="/">
            <img src={Logo} alt="ema-jhon logo" />
        </a>
        <nav className="nav-items">
            <Link to="/shop">shop</Link>
            <Link to="/cart">view cart</Link>
            <Link to="/delivery">Delivery details</Link>
        </nav>
    </div>
);

export default Header;
