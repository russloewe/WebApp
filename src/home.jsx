import React, {useState, useEffect} from 'react';
//import ReactDOM from 'react-dom';
//import { BrowserRouter as Router, Route } from 'react-router-dom';
//redux store functions
//sub comp
import Article from './react/blog/article.jsx';
//server api
import {getSimple} from './api/api.js';


export default function Home () {
	// Display one page from db matching topic HOME
    
    // State Hook for page data
    const [page, setPage] = useState(1);
    
    // Effect Hook for retreiving page data
    useEffect (() => { 
        getSimple('/pages/topic/home', function(err,res){
            if(err){
                console.log(err);
            }else{
                setPage(res[0]); // just put whole obj from srver here
            }
        })
    });
    
    render() {
        return(
           <div>
              <Article article={page} title={false} date={false}/>
           </div>
        )
    }
}


                
