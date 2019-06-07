import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

//load the root components
import LoginScreen from './loginScreen.jsx';
import NavBar from './react/navbar.jsx';
import UserBox from './react/user/userBox.jsx';

//load the apps
import Projects from './projects.jsx';
import Home from './home.jsx';


if(document.getElementById("main")){
ReactDOM.render(
    <Router>
        <div>
            <Route exact path="/" component={Home} />
            <Route path="/auth/login" component={LoginScreen} />
            <Route exact path="/blog" component={Blog} />
            <Route path="/blog/post/:id" component={Blog} />
            <Route exact path="/projects" component={Projects} />
            <Route path="/projects/post/:id" component={Projects} />
        </div>
    </Router>,
    document.getElementById('main')
)}



if(document.getElementById("userbox")){
ReactDOM.render(
    <Router>
        <div>
            <UserBox />
        </div>
    </Router>,
    document.getElementById('userbox')
)}

ReactDOM.render(
        <div>
            <NavBar />
        </div>,
    document.getElementById('navbar')
)


    
