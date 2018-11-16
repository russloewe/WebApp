import React from 'react';
import ReactDOM from 'react-dom';
import {updateUserList} from '../../redux/actions';
import { connect } from "react-redux";
import {postSimple, getSimple} from "../../api/api.js";


export default class EditUser extends React.Component {
    constructor(props){
        super(props);
        this.state = {username: 'username',
                      password: 'password',
                      email: 'email',
                      user_type: 2};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.getData = this.getData.bind(this);
    }
    
    handleChange(event) {
      const target = event.target;
      const value = target.value;
      const name = target.name;
      this.setState({[name]: value});
    } 
    
    handleSubmit(event) {
        var cb = this.getData;
        event.preventDefault();
        const jsonData = {username: this.state.username,
                          password: this.state.password,
                          email:    this.state.email,
                          user_type: this.state.user_type}
        postSimple('/users/add', jsonData, (err, res) => {
            if(err){
                console.log('Error Trying to add user.');
                console.log(err);
            }else{
                console.log(res.status);
                cb();
            }
        })
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
    render() {
        return(
           <div className="tile" id="createUser">
              <form onSubmit={this.handleSubmit} >
                 <input name="username" type="text" value={this.state.username} onChange={this.handleChange} /> <br/>
                 <input name="password" type="text" value={this.state.password} onChange={this.handleChange} /> <br/>
                 <input name="email" type="text" value={this.state.email} onChange={this.handleChange} /> <br/>
                 <input name="user_type" type="text" value={this.state.user_type} onChange={this.handleChange} /> <br/>
                 <input type="submit" value="submit" />
              </form>
           </div>
        )
    }
}

                
