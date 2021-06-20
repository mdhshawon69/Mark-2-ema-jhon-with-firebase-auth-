import React, { createContext, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import CartDetails from './Components/CartDetails/CartDetails';
import Error404 from './Components/Error404/Error404';
import Header from './Components/Header/Header';
import Login from './Components/Login/Login';
import PrivateComponent from './Components/PrivateComponent/PrivateComponent';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import Shipment from './Components/Shipment/Shipment';
import Shop from './Components/Shop/Shop';

export const UserContext = createContext();

function App() {
    const [loggedUser, setLoggedUser] = useState({});
    const logged = true;

    return (
        <UserContext.Provider value={[loggedUser, setLoggedUser]}>
            <p>Email: {loggedUser.email}</p>
            <Router>
                <Header />
                <Switch>
                    <Route exact path="/">
                        <Shop />
                    </Route>
                    <Route path="/shop">
                        <Shop />
                    </Route>
                    <Route path="/cart">
                        <CartDetails />
                    </Route>
                    <Route path="/product/:productKey">
                        <ProductDetails />
                    </Route>
                    <PrivateComponent path="/shipment">
                        <Shipment />
                    </PrivateComponent>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="*">
                        <Error404 />
                    </Route>
                </Switch>
            </Router>
        </UserContext.Provider>
    );
}

export default App;
