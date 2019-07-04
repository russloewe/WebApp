import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

//load the apps
//import Projects from './projects.jsx';
import Home from './home.jsx';
import LoginScreen from './loginScreen.jsx';


if(document.getElementById("main")){
ReactDOM.render(
    <Router>
        <div>
            <Route  path="/" component={Home} />
            <Route path="/auth/login" component={LoginScreen} />
        </div>
    </Router>,
    document.getElementById('main')
)}


