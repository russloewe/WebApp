import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from "react-redux";
import { Provider } from "react-redux";
import EditArticle from './editArticle.jsx';

const mapStateToProps = state => {
    return{isAdmin: state.user.isAdmin,
		   parent: state.parentTopic,
		   editArticleCB: state.editArticleCB};
};

function Article(props){
	    let title;
	    let datetext;
        let date;
        if(props.article.created_on){
         const datestring = props.article.created_on.split("T")[0].split("-");
         date = {year: datestring[0],
                    month: parseInt(datestring[1]),
                    day: datestring[2]};
        }else{
             date = {year: 0,
                    month: 0,
                    day: 0};
                }
        
		const monthlist = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov','Dec'];
		
		if(props.title){ title = props.article.title;}
	    else{title = '';}
	    
	    if(props.date){ 
			datetext = monthlist[date.month - 1] + ' '+ date.day + ', '+date.year;}
	    else{datetext = '';}
	    
	    const editbutton = (p) => { 
			return(
				<EditArticle article={p} apiTarget={props.parent+"/edit"} update={props.editArticleCB} />
			)};
				
    return(    
       <div className="article" >
            <h2>{title}</h2>
            <h6>{datetext}</h6><br/>
            <div dangerouslySetInnerHTML={{ __html: props.article.text }}></div>
            {props.isAdmin ? editbutton(props.article) : ''}       
       </div>
        )
}
export default connect(mapStateToProps)(Article);
