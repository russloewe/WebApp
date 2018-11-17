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
        
    return(
       <div id="article" >
            <div className="tile">
            <h3>{props.article.title}</h3>
            {props.article.created_on}<br/>
            {props.article.text}
            </div>
            {isAdmin(props.user.user_type) ? adminbutton : ''}
            
       </div>
        )
}
export default connect(mapStateToProps)(Article);
