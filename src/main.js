import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from 'react-router-dom';

//initialize the root store
import store from "./redux/store";
window.store = store;

//load the root components
import Admin from './admin.jsx';
import LoginScreen from './loginScreen.jsx';
import NavBar from './react/navbar.jsx';
import UserBox from './react/user/userBox.jsx';

//load the apps
import Blog from './blog.jsx';
import Projects from './projects.jsx';
import Home from './home.jsx';


if(document.getElementById("main")){
ReactDOM.render(
    <Router>
    <Provider store={store}>
        <div>
            <Route exact path="/" component={Home} />
            <Route path="/admin" component={Admin} />
            <Route path="/auth/login" component={LoginScreen} />
            <Route path="/blog" component={Blog} />
            <Route path="/projects" component={Projects} />
        </div>
    </Provider>
    </Router>,
    document.getElementById('main')
)}

if(document.getElementById("userbox")){
ReactDOM.render(
    <Router>
    <Provider store={store}>
        <div>
            <UserBox />
        </div>
    </Provider>
    </Router>,
    document.getElementById('userbox')
)}

ReactDOM.render(
    <Provider store={store}>
        <div>
            <NavBar />
        </div>
    </Provider>,
    document.getElementById('navbar')
)


    
