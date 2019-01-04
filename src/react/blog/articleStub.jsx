import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from "react-redux";
import { Provider } from "react-redux";

const mapStateToProps = state => {
    return{isAdmin: state.user.isAdmin,
		   parent: state.parentTopic,
		   editArticleCB: state.editArticleCB};
};

function ArticleStub(props){
	    let title;
	    let datetext;
        let img;
        let date = new Date(props.article.created_on);
		const monthlist = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov','Dec'];
		
	    if(props.image){
            img = <img src={props.article.thumb_img} />;
        }else{
            img = '';
        }

	    if(props.date){ 
			datetext = monthlist[date.getMonth()] + ' '+ date.getDay() + ', '+date.getFullYear();}
	    else{datetext = '';}

    return(    
        <a href={props.parent+"/post/"+props.article.article_id+'/'+props.article.title} >
            <div className="article-stub">
                {img}
                <h3>{props.article.title}</h3>
                <h6>{datetext}</h6>
                <p>{props.article.description}</p>
            </div>
        </a>         
        )
}
export default connect(mapStateToProps)(ArticleStub);
