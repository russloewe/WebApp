import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from "react-redux";
import { Provider } from "react-redux";
//sub comp
import Article from './react/blog/article.jsx';
import ArticleList from './react/blog/articleList.jsx';
import AddArticle from './react/blog/addArticle.jsx';
//redux store
import {Articles, setArticle, setBlogTitles, setParentTopic, setEditArticleCB} from "./redux/actions.js";
import {BLOG} from "./redux/topic-types.js";
//server api
import {getSimple} from './api/api.js';

const mapStateToProps = state => {
    return{projects: state.articles,
		   project: state.article,
		   user: state.user};
};

function getAllBlogs(){
        getSimple('/blog/all', function(err,res){
            if(err){
                console.log(err);
            }else{
                console.log(res);
                store.dispatch(Articles(res));
            }
        });
        getAllBlogTitles();
}

function getAllBlogTitles(){
        getSimple('/blog/all/titles', function(err,res){
            if(err){
                console.log(err);
            }else{
                console.log(res);
                store.dispatch(setBlogTitles(res));
            }
        })
}

function getBlogCB(id){
	return(
		function getBlog(){
			getSimple('/blog/article?id='+id, function(err,res){
				if(err){
					console.log(err);
				}else{
					console.log(res);
					store.dispatch(setArticle(res));
				}
			});
			getAllBlogTitles();
		 }
	)
}
	
function getBlog(id){
        getSimple('/blog/article?id='+id, function(err,res){
            if(err){
                console.log(err);
            }else{
                console.log(res);
                store.dispatch(setArticle(res));
            }
        });
        getAllBlogTitles();
}
    
class Blog extends React.Component {
    constructor(props){
        super(props);
        //get the list of project titles
        getAllBlogTitles();
        if(this.props.match.params.id){
			getBlog(this.props.match.params.id);
			store.dispatch(setEditArticleCB(getBlogCB(this.props.match.params.id)));
		}else{
			getAllBlogs();
			store.dispatch(setEditArticleCB(getAllBlogs));
		}
		store.dispatch(setParentTopic(BLOG));
		
    }

    render() {
		if(this.props.match.params.id){
			return(
				<Article article={this.props.project} key={this.props.project.article_id} title={true} date={false}/>
			)
		}else{
			return(
				<ArticleList articles={this.props.projects} image={false} date={true} />
			)
		}
	}
}

export default connect(mapStateToProps)(Blog);
