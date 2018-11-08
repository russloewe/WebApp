import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from "react-redux";

//sub comp
import CustomerList from './react/customerList.jsx';
import EditUser from './react/editUser.jsx';

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
              <CustomerList />
              <EditUser />
              Adimn Dash
           </div>
        )
    }
}

export default connect(mapStateToProps)(Admin);
                
