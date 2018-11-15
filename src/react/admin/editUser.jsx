import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from "react-redux";
import {postSimple} from "../../api/api.js";

const mapStateToProps = state => {
    return{activeUser: state.activeUser};
};

class EditUser extends React.Component {
    constructor(props){
        super(props);
        this.state = {username: '',
                      email: '',
                      password: ''}
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.resetUser = this.resetUser.bind(this);
    }
    
    componentDidMount (){
        this.unsubscribe = store.subscribe(this.resetUser);
        this.resetUser();
    }
    
    componentWillUnmount() {
        this.unsubscribe();
    }
    
    resetUser() {
        this.setState({username: this.props.activeUser.username,
                       email: this.props.activeUser.email,
                       password: this.props.activeUser.password});
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
        postSimple('/', jsonData, (err, res) => {
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
                 Username: <input name="username" type="text" value={this.state.username} onChange={this.handleChange} /> <br/>
                 Email:     <input name="email" type="text" value={this.state.email} onChange={this.handleChange} /> <br/>
                 Password: <input name="password" type="text" value={this.state.password} onChange={this.handleChange} /> <br/> 
                 <input type="submit" value="submit" />
              </form>
           </div>
        )
    }
}
export default connect(mapStateToProps)(EditUser);
