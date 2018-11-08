import React from 'react';
import ReactDOM from 'react-dom';
import {databaseUpdateUsers, databaseStatus, userStatus} from '../redux/actions';
import { connect } from "react-redux";
import {postSimple} from "../api/api.js";


export default class EditUser extends React.Component {
    constructor(props){
        super(props);
        this.state = {username: 'bob',
                      password: 'pass'};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange(event) {
      const target = event.target;
      const value = target.value;
      const name = target.name;
      this.setState({[name]: value});
    } 
    
    handleSubmit(event) {
        event.preventDefault();
        const jsonData = {username: this.state.username,
                          password: this.state.password}
        postSimple('/auth/login', jsonData, (err, res) => {
            if(err){
                console.log('Error Trying to login.');
                console.log(err);
            }else{
                console.log(res.url);
                window.location.href = res.url;
            }
        })
        
    }
    
    render() {
        return(
           <div>
              <form onSubmit={this.handleSubmit} >
                 <input name="username" type="text" value={this.state.username} onChange={this.handleChange} />
                 <input name="password" type="text" value={this.state.password} onChange={this.handleChange} />
                 <input type="submit" value="submit" />
              </form>
           </div>
        )
    }
}

                
