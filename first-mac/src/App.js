import React from 'react';
import {BrowserRouter as Router, Switch, Route } from "react-router-dom";


import UserRegistration from './User/UserRegistration';
import UserLogin from './User/UserLogin';
import Home from './SocialMedia/home';

function App() {
  return (
    <Router>
        <Switch>
            <Route path="/" exact component={UserRegistration} />
            <Route path="/login" component={UserLogin} />
            <Route path="/home" component={Home} />
        </Switch>
    </Router>
)
}

export default App;
