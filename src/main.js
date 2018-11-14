import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from 'react-router-dom';

//initialize the root store
import store from "./root/redux/store";
window.store = store;

//load the root components
import Admin from './root/admin.jsx';
import LoginScreen from './root/loginScreen.jsx';
import NavBar from './root/react/navbar.jsx';
import UserBox from './root/react/userBox.jsx';

//load the apps
import Blog from './apps/blog/blog.jsx';
import Projects from './apps/projects/projects.jsx';



if(document.getElementById("main")){
ReactDOM.render(
    <Router>
    <Provider store={store}>
        <div>
            <Route path="/admin" component={Admin} />
            <Route path="/auth/login" component={LoginScreen} />
            <Route path="/blog" component={Blog} />
            <Route path="/projects" component={Projects} />
        </div>
    </Provider>
    </Router>,
    document.getElementById('main')
)}

if(document.getElementById("main")){
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


    
