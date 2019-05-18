import React from 'react';
import ReactDOM from 'react-dom';
import {userStatus} from '../../redux/actions';
import { connect } from "react-redux";
import {getSimple} from "../../api/api.js";

const mapStateToProps = state => {
    return{user: state.user};
};


class UserBox extends React.Component {
    constructor(props){
        super(props);
    }
    
    componentDidMount() {
        getSimple('/auth/status', function(err, data) {
            if(err){
                console.log("Error getting user status");
            }
            if(data.username){
                store.dispatch(userStatus({loggedin: true,
                                           username: data.username}));
            }
        })
    }
    
    render() {
        const usertype = this.props.user.usertype;
        const name = this.props.user.username;
        const greeting = <span>Hello, {name}!</span>;
        
        return(
           <div id="userbox">
           {this.props.user.loggedin ? greeting : ''}
           {this.props.user.loggedin ? <a id="logout" href="/auth/logout">Logout</a> : <a href="/auth/login">Login</a>}
           </div>
        )
    }
}
export default connect(mapStateToProps)(UserBox);

                
