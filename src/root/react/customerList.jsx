import React from 'react';
import ReactDOM from 'react-dom';
import {databaseUpdateUsers, databaseStatus} from '../redux/actions';
import { connect } from "react-redux";
import {getSimple} from "../api/api.js";


const mapStateToProps = state => {
    return{simpleDatabase: state.simpleDatabase,
           simpleDatabaseStatus: state.simpleDatabaseStatus};
};

class CustomerList extends React.Component {
    constructor(props){
        super(props);
        this.getData = this.getData.bind(this);
    }
    
    getData() {
        getSimple('/users/all', (err, res) => {
            if(err){
                store.dispatch(databaseStatus(false));
            }else{
                store.dispatch(databaseUpdateUsers(res));
                store.dispatch(databaseStatus(true));
            }
        })            
    }
    
    render() {
        return(
            <div>
            <button onClick={this.getData}>Get Users </button>
                {this.props.simpleDatabase.users.map(p => (
                    <div className="tile" key={p.user_id}>
                        <h4>{p.username}</h4>
                        <h5>{p.email}</h5>
                        {p.created_on}
                    </div>
                    )
                  )
                }
                </div>
        )
    }
}

export default connect(mapStateToProps)(CustomerList);
                
