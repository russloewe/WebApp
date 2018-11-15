import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from "react-redux";
import {getSimple} from "../api/api.js";
import {userStatus} from '../redux/actions';


const mapStateToProps = state => {
    return{user: state.user};
};

class NavBar extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
  
        const usertype = this.props.user.usertype;
        const adminbutton = <a href="/admin">Admin Tools</a>;
        
        const isAdmin = (type) => {
            if (type != 1){
                return false;
            }else{
                return true;
            }
        };
        return (
  <div>
    <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/projects">Projects</a></li>
        <li><a href="/blog">Blog</a></li>
        <li>{isAdmin(this.props.user.usertype) ? adminbutton : ''} </li> 
    </ul>
    
  </div>
  );
}
}
export default connect(mapStateToProps)(NavBar);
