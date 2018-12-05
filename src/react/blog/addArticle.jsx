import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from "react-redux";
import {postSimple} from "../../api/api.js";

export default class AddArticle extends React.Component {
    constructor(props){
        super(props);
        this.state = {title: ' ',
                      text: ' ',
                      keywords: ' ',
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
        let cb = this.props.update;
        let toggle = this.toggleVisible;
        event.preventDefault();
        const jsonData = {title: this.state.title,
                          text: this.state.text,
                          keywords: this.state.keywords}
        postSimple(this.props.apiTarget, jsonData, (err, res) => {
            if(err){
                console.log('Error Trying to change user.');
                console.log(err);
            }else{
                cb();
                toggle();
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
                 Title: <input name="title" type="text" value={this.state.title} onChange={this.handleChange} /> <br/>
                 Keywords: <input name="keywords" type="text" value={this.state.keywords} onChange={this.handleChange} /> <br/>
                 Body:<br/><textarea name="text" type="text" cols="80" rows="20" value={this.state.text} onChange={this.handleChange} /> <br/>
                 <input type="submit" value="submit" />
              </form>
              )
            }
            
        return(
           <div>
              <button onClick={this.toggleVisible}>{this.state.visible ? 'Done' : 'AddPost'}</button>
              {form}
           </div>
        )
    }
}
