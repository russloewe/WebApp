import React from 'react';
import ReactDOM from 'react-dom';

export default function Article(props){
	    let title;
	    let datetext;
	    
	    
        const usertype = props.usertype;        
        const isAdmin = (type) => {
            if (type != 1){
                return false;
            }else{
                return true;
            }
        }; 
        let date = new Date(props.article.created_on);
		const monthlist = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov','Dec'];
		
		if(props.title){ title = props.article.title;}
	    else{title = '';}
	    
	    if(props.date){ 
			datetext = monthlist[date.getMonth()] + ' '+ date.getDay() + ', '+date.getFullYear();}
	    else{datetext = '';}
    return(    
       <div id="article" >
            <div className="tile">
            <h3>{title}</h3>
            {datetext}<br/>
            <div dangerouslySetInnerHTML={{ __html: props.article.text }}></div>
            </div>

            
       </div>
        )
}

