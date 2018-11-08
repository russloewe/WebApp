import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from "react-redux";

//sub comp
import UserList from './react/userList.jsx';
import EditUser from './react/editUser.jsx';
import CreateUser from './react/createUser.jsx';

const mapStateToProps = state => {
    return{article: state.article};
};

class Admin extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return(
           <div >
              <h3>Admin Dashboard </h3>
              <UserList />
              <h4> Edit User </h4>
              <EditUser />
              <h4> Create User </h4>
              <CreateUser />
           </div>
        )
    }
}

export default connect(mapStateToProps)(Admin);
                
