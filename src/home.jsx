import React, {useState, useEffect} from 'react';
import {getPageCardsAll} from './api/api.js';

import Page from './react/page.jsx';
import LoginScreen from './loginScreen.jsx';
import NavBar from './react/navbar.jsx';
import UserBox from './react/userBox.jsx';

export default function Home () {
	console.log('homepage component');
	// State hook for storing page list
	const [homePageId, setHomePageId] = useState(1);
	const [pageCards, setPageCards] = useState(2);
	
	// Effect hook for getting page list from server
	useEffect (() => {
		getPageCardsAll( (err, res) => {
			if(err){
				console.log(err)
			}else{
				/* There should only be one page in the response.
				 * For now just use first object in pagecards
				 */
				 console.log('response');
				 console.log(res);
				setPageCards(res);
				
				// get the page id of the first page matching home card
				var i;
				for(i = 0; i < res.length; i++){
					if( res[i].topic == "home"){
						setHomePageId(res[i].id);
					}
				}
			}
		});
		
	})
	    
    return(
	   <div id="Home">
		  <div id="name"/>
		  <div id="icons"/>
		  <div id="title-text"/>
		  <UserBox />
		  <NavBar pageCards={pageCards} />
		  <Page pageId={homePageId} title="false" date="false" />
	   </div>
	)

}


                
