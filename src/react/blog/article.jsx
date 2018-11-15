import React from 'react';
import ReactDOM from 'react-dom';
import {getSimpleId} from "../../api/api.js";
import {setArticle} from '../../redux/actions';
import { connect } from "react-redux";

export default function Article(props){

    return(
       <div id="article" >
          {props.articles.map(article => (
            <div className="tile" key={article.article_id}>
            <h3>{article.title}</h3>
            {article.created_on}<br/>
            {article.text}
            </div>
           ))}
       </div>
        )
}

