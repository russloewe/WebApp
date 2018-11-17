import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from "react-redux";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from 'react-router-dom';
//sub comp
import Article from './react/blog/article.jsx';
import EditArticle from './react/blog/editArticle.jsx';
//server api
import {getSimple, getSimpleId} from './api/api.js';
//redux actions
import {allArticles, setArticle} from "./redux/actions.js";

const mapStateToProps = state => {
    return{article: state.article,
           articles: state.articles};
};

class Blog extends React.Component {
    constructor(props){
        super(props);
        this.getArticle();
        this.getAllArticles();
    }
    getAllArticles(){
        getSimple('/blog/all', function(err,res){
            if(err){
                console.log(err);
            }else{
                console.log(res);
                store.dispatch(allArticles(res));
                
            }
        })
    }
    
    getArticle() {
        getSimpleId(1, function (err, data) {
            if (err){
                console.log("Error getting article");
            }else{
                store.dispatch(setArticle(data));
            }
        })
    }
    render() {
        return(
           <div >
           {this.props.articles.map(p => (
               <div key={p.article_id}>
              <Article article={p} />
              <EditArticle article={p} apiTarget="/blog/edit" update={this.getAllArticles} />
              </div>
              ))
          }
           </div>
        )
    }
}

export default connect(mapStateToProps)(Blog);
                
