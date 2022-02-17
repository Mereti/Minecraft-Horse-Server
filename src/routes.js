import React from 'react';
import { Switch, Route } from 'react-router-dom';
/**
 * Import all page components here
 */
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Home from "./components/Home/Home";
import Dashboard from "./components/Dashboard/Dashboard";


const Main = () => {
    return (
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/login' component={Login}/>
            <Route path='/register' component={Register}/>
            <Route path="/panel" component={Dashboard}/>
        </Switch>
    );
}

export default Main;

