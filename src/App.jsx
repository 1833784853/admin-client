import React, { Component } from 'react';

import { HashRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/login/Login';
import Admin from './pages/admin/Admin';
export default class App extends Component {
    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/" component={Admin} />    
                </Switch>
            </HashRouter>
        )
    }
};
