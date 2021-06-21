/* eslint-disable no-unused-vars */
/* eslint-disable import/no-cycle */
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import Logo from '../../images/logo.png';
import './Header.css';

const Header = () => {
    const [loggedUser, setLoggedUser] = useContext(UserContext);
    return (
        <div className="header">
            <a to="/">
                <img src={Logo} alt="ema-jhon logo" className="logo" />
            </a>
            <nav className="nav-items">
                <Link to="/shop">shop</Link>
                <Link to="/cart">view cart</Link>
                <Link to="/delivery">Delivery details</Link>
                <img src={loggedUser.photoURL} alt="" className="profile" />
            </nav>
        </div>
    );
};

export default Header;
