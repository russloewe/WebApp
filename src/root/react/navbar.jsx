import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from "react-redux";
import {getSimple} from "../api/api.js";
import {userStatus} from '../redux/actions';
import UserBox from './userBox.jsx';

const mapStateToProps = state => {
    return{user: state.user};
};

class NavBar extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
  return (
  <div>
    <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/projects">Projects</a></li>
        <li><a href="/blog">Blog</a></li>
        <li><UserBox /></li>
    </ul>
    
  </div>
  );
}
}
export default connect(mapStateToProps)(NavBar);
