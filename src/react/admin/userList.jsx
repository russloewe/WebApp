import React from 'react';
import ReactDOM from 'react-dom';
import {updateUserList, setActiveUser} from '../../redux/actions';
import { connect } from "react-redux";
import {getSimple, postSimple} from "../../api/api.js";
import EditUser from "./editUser.jsx";


const mapStateToProps = state => {
    return{userList: state.userList};
};

class UserList extends React.Component {
    constructor(props){
        super(props);
        this.getData = this.getData.bind(this);
        this.delUser = this.delUser.bind(this);
        this.getData();
    }
    componentDidMount(){
        this.timerID = setInterval(() => this.tick(), 1000);
    }
    componentWillUnmount() {
        clearInterval(this.timerID);
    }
    tick(){
        this.getData();
    }
    getData() {
        getSimple('/users/all', (err, res) => {
            if(err){
                console.log("Error getting user list");
            }else{
                store.dispatch(updateUserList(res));
            }
        })
    }
    
    delUser(input_user_id){
        var cb = this.getData;
        postSimple('/users/remove', {user_id: input_user_id}, function(err, res){
            if(err){
                 window.alert("error deleting user: "+ value);
            }else{
                cb();
          }
        });
    }
    
    render() {
        return(
            <div id="userlist">
                {this.props.userList.map(p => (
                    <div className="usertile" key={p.user_id}>
                        <h4>{p.username}</h4>
                        email: {p.email}<br/>
                        password: {p.password}<br/>
                        id: {p.user_id} <br />
                        created: {p.created_on} <br />
                        <button onClick={() => this.delUser(p.user_id) } >Delete User</button>
                        <EditUser user={p} update={this.getData}/>
                    </div>
                    )
                  )
                }
                </div>
        )
    }
}

export default connect(mapStateToProps)(UserList);
                
