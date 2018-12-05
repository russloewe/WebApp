import React from 'react';
import ReactDOM from 'react-dom';
import {getSimpleId} from "../../api/api.js";
import {setArticle} from '../../redux/actions';
import { connect } from "react-redux";
const mapStateToProps = state => {
    return{user: state.user};
};

function Article(props){
        const usertype = props.user.usertype;
        const adminbutton = <a href="/admin">Admin Tools</a>;
        
        const isAdmin = (type) => {
            if (type != 1){
                return false;
            }else{
                return true;
            }
        }; 
        let date = new Date(props.article.created_on);
		const monthlist = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov','Dec'];
		let datetext = monthlist[date.getMonth()] + ' '+ date.getDay() + ', '+date.getFullYear();
    
    return(    
       <div id="article" >
            <div className="tile">
            <h3>{props.article.title}</h3>
            {datetext}<br/>
            <div dangerouslySetInnerHTML={{ __html: props.article.text }}></div>
            
            </div>
            {isAdmin(props.user.user_type) ? adminbutton : ''}
            
       </div>
        )
}
export default connect(mapStateToProps)(Article);
