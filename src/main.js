import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from 'react-router-dom';

//initialize the root store
import store from "./redux/store";
window.store = store;

//load the root components
import UserBox from './react/userBox.jsx';

//
if(document.getElementById("rloewe_userbox")){
ReactDOM.render(
    <Router>
    <Provider store={store}>
        <div>
            <UserBox />
        </div>
    </Provider>
    </Router>,
    document.getElementById('rloewe_userbox')
)}

    
