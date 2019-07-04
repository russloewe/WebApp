/* filename: navbar.jsx
 * author:   russell loewe
 * date:   jun 2019
 * site: https://github.com/russloewe/WebApp
 * desc:
 * 	React component for displaying the navigation bar. 
 */

import React from 'react';

function TitleList (props){
	return(
	<div className="subnav">
	 <ul>
		{props.titles.map(p => (
			<li key={p.id}><a className="subnav" href={p.url} >{p.title}</a></li>
		))}
	</ul>
	</div>
	)
}

export default function NavBar (props) {

	console.log('Navbar component');
	console.log(props.pageCards);
	if(typeof props.pageCards === "array"){
        return (
		  <div className="navbar">
			<ul>
				<li><a href="/">Home</a></li>
				<li><a href="/projects">Projects</a>
				<TitleList titles={props.pageCards}  /></li>
			</ul>
			
		  </div>
		);
	}else{
		return (
		<div className="navbar">
			<ul>
				<li><a href="/">Home</a></li>
				<li><a href="/projects">Projects</a></li>
			</ul>
			
		  </div>
		  );

	}
}
