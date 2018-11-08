import React from 'react';
import ReactDOM from 'react-dom';
import {updateUserList, setActiveUser} from '../redux/actions';
import { connect } from "react-redux";
import {getSimple} from "../api/api.js";
import EditUser from "./editUser.jsx";


const mapStateToProps = state => {
    return{userList: state.userList};
};

class UserList extends React.Component {
    constructor(props){
        super(props);
        this.getData = this.getData.bind(this);
    }
    
    getData() {
        getSimple('/users/all', (err, res) => {
            if(err){
                console.log("Error getting user list");
            }else{
                store.dispatch(updateUserList(res));
                store.dispatch(setActiveUser(res[0]));
            }
        })
    }
    
    render() {
        return(
            <div>
            <button onClick={this.getData}>Get Users </button>
                {this.props.userList.map(p => (
                    <div className="tile" key={p.user_id}>
                        <h4>{p.username}</h4>
                        {p.email}<br/>
                        {p.password}<br/>
                        {p.created_on}
                    </div>
                    )
                  )
                }
                </div>
        )
    }
}

export default connect(mapStateToProps)(UserList);
                
