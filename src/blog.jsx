import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from "react-redux";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from 'react-router-dom';
//sub comp
import Article from './react/blog/article.jsx';
import EditArticle from './react/blog/editArticle.jsx';
import AddArticle from './react/blog/addArticle.jsx';
//server api
import {getSimple, getSimpleId} from './api/api.js';
//redux actions
import {allArticles, setArticle} from "./redux/actions.js";

const mapStateToProps = state => {
    return{article: state.article,
           articles: state.articles,
           user: state.user};
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
		const usertype = this.props.user.usertype;
        const addbutton =  <AddArticle apiTarget="/blog/add" update={this.getAllArticles} />;
        const editbutton = (p) => { 
			return(
				<EditArticle article={p} apiTarget="/blog/edit" update={this.getAllArticles} />
				)};
		const isAdmin = (type) => {
            if (type != 1){
                return false;
            }else{
                return true;
            }
        };
        return(
           <div >
           {this.props.articles.map(p => (
               <div key={p.article_id}>
              <Article article={p} title={true} date={true} />
				{isAdmin(this.props.user.usertype) ? editbutton(p) : ''}
              </div>
              ))
          }
          {isAdmin(this.props.user.usertype) ? addbutton : ''}
           </div>
        )
    }
}

export default connect(mapStateToProps)(Blog);
                
