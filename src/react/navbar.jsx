import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from "react-redux";
import {getSimple} from "../api/api.js";
import {userStatus} from '../redux/actions';


const mapStateToProps = state => {
    return{user: state.user,
		   projectTitles: state.projectTitles,
		   blogTitles: state.blogTitles,
		   parentTopic: state.parentTopic};
};

class TitleList extends React.Component{
	constructor(props){
		super(props);
	}
	render() {
		return(
		<div className="subnav">
		 <ul>
			{this.props.titles.map(p => (
				<li><a className="subnav" href={this.props.parent+"/post/"+p.article_id} key={p.article_id}>{p.title}</a></li>
			))}
		</ul>
		</div>
		)
	}
}

class NavBar extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        const adminbutton = <a href="/admin">Admin Tools</a>;
      
        return (
		  <div className="navbar">
			<ul>
				<li><a href="/">Home</a></li>
				<li><a href="/projects">Projects</a>
				<TitleList titles={this.props.projectTitles} parent="/projects" /></li>
				<li><a href="/blog">Blog</a>
				<TitleList titles={this.props.blogTitles} parent="/blog" /></li>
				<li>{this.props.user.isAdmin ? adminbutton : ''} </li> 
			</ul>
			
		  </div>
  );
}
}
export default connect(mapStateToProps)(NavBar);
