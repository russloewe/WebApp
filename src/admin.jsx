import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from "react-redux";

//sub comp
import UserList from './react/admin/userList.jsx';
import EditUser from './react/admin/editUser.jsx';
import CreateUser from './react/admin/createUser.jsx';

const mapStateToProps = state => {
    return{article: state.article};
};

class Admin extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return(
        <div>
           <div className="tile">
              <h3>User List</h3>
              <UserList />
           </div>
            <div className="tile">
              <h3>Add User</h3>
              <CreateUser />
           </div>
        </div>
        )
    }
}

export default connect(mapStateToProps)(Admin);
                
