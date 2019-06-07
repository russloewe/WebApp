/* filename: navbar.jsx
 * author:   russell loewe
 * date:   jun 2019
 * site: https://github.com/russloewe/WebApp
 * desc:
 * 	React component for displaying the navigation bar. Querries
 * the web api for an array of page cards. Uses the 
 */

import React from 'react';
import ReactDOM from 'react-dom';
import {getSimple} from "../api/api.js";


class TitleList extends React.Component{
	constructor(props){
		super(props);
	}
	render() {
		return(
		<div className="subnav">
		 <ul>
			{this.props.titles.map(p => (
				<li key={p.article_id}><a className="subnav" href={this.props.parent+"/post/"+p.article_id+'/'+p.title} >{p.title}</a></li>
			))}
		</ul>
		</div>
		)
	}
}

export default class NavBar extends React.Component {
    constructor(props){
        super(props);
    }

    render() {      
        return (
		  <div className="navbar">
			<ul>
				<li><a href="/">Home</a></li>
				<li><a href="/projects">Projects</a>
				<TitleList titles={this.props.projectTitles} parent="/projects" /></li>
				<li><a href="/blog">Blog</a>
				<TitleList titles={this.props.blogTitles} parent="/blog" /></li>
			</ul>
			
		  </div>
  );
}
}
