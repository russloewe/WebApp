import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from "react-redux";
import {postSimple} from "../../api/api.js";

export default class EditUser extends React.Component {
    constructor(props){
        super(props);
        this.state = {user_id: props.user.user_id,
                      username: props.user.username,
                      email: props.user.email,
                      password: props.user.password,
                      user_type: props.user.user_type,
                      visible: false}
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.toggleVisible = this.toggleVisible.bind(this);
    }
    
    handleChange(event) {
      const target = event.target;
      const value = target.value;
      const name = target.name;
      this.setState({[name]: value});
    } 
    
    handleSubmit(event) {
        event.preventDefault();
        const jsonData = {user_id: this.state.user_id,
                          username: this.state.username,
                          email: this.state.email,
                          user_type: this.state.user_type}
        postSimple('/users/edit', jsonData, (err, res) => {
            if(err){
                console.log('Error Trying to change user.');
                console.log(err);
            }else{
                console.log(res.body);
                this.props.update();
            }
        })
    }

    toggleVisible(){
        this.setState({visible: !this.state.visible});
    }

    render() {
        let form = null;
        if(this.state.visible){
            form = (
            <form onSubmit={this.handleSubmit} >
                 Username: <input name="username" type="text" value={this.state.username} onChange={this.handleChange} /> <br/>
                 Email:     <input name="email" type="text" value={this.state.email} onChange={this.handleChange} /> <br/>
                 Password: <input name="password" type="text" value={this.state.password} onChange={this.handleChange} /> <br/> 
                 type: <input name="user_type" type="text" value={this.state.user_type} onChange={this.handleChange} /> <br/> 
                 <input type="submit" value="submit" />
              </form>
              )
            }
            
        return(
           <div>
              <button onClick={this.toggleVisible}>{this.state.visible ? 'Done' : 'Edit'}</button>
              {form}
           </div>
        )
    }
}
