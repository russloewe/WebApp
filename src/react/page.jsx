import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import FormatDate from './date.jsx';
import {getSimple} from '../api/api.js';


export default function Page (props){
	    // State hook for storing article object from server
	    const [page, setPage] = useState(1);
	    
	    // Effect hook for querrying server for page
	    useEffect (() => {
			getSimple('/pages/topic/home', function(err, res){
				if(err){
					console.log(err);
				}else {
					setPage(res[0]);
				}
			})
		});
			
	    let datetext;
	    let title;
        if(page.created && (props.date == "true")){
          datetext = FormatDate(page.created);
        }else{
            datetext = '';
        }
        if(props.title == "true"){
			title = page.title;
		}else{
			title = ' ';
		}
	
    return(    
    <div>
       <div className="article" >
            <h2>{title}</h2>
            <h6>{datetext}</h6>
            <div dangerouslySetInnerHTML={{ __html: page.body }}></div>
       </div>
    </div>
        )
}

