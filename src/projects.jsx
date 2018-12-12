import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from "react-redux";
import { Provider } from "react-redux";
//sub comp
import Article from './react/blog/article.jsx';
import ArticleList from './react/blog/articleList.jsx';
import AddArticle from './react/blog/addArticle.jsx';
//redux store
import {allArticles, setArticle, allArticlesTitles} from "./redux/actions.js";
//server api
import {getSimple} from './api/api.js';

const mapStateToProps = state => {
    return{projects: state.articles,
		   project: state.article,
		   user: state.user};
};

function getAllProjects(){
        getSimple('/projects/all', function(err,res){
            if(err){
                console.log(err);
            }else{
                console.log(res);
                store.dispatch(allArticles(res));
            }
        })
}

function getAllProjectsTitles(){
        getSimple('/projects/all/titles', function(err,res){
            if(err){
                console.log(err);
            }else{
                console.log(res);
                store.dispatch(allArticlesTitles(res));
            }
        })
}

function getProject(id){
        getSimple('/projects/article?id='+id, function(err,res){
            if(err){
                console.log(err);
            }else{
                console.log(res);
                store.dispatch(setArticle(res));
            }
        })
}
    
class Projects extends React.Component {
    constructor(props){
        super(props);
        getAllProjectsTitles();
        if(this.props.match.params.id){
			getProject(this.props.match.params.id);
		}else{
			getAllProjects();
		}
    }

    render() {
		const usertype = this.props.user.usertype;
		const isAdmin = (type) => {
            if (type != 1){return false;
            }else{return true;}
        };
        
		if(this.props.match.params.id){
			return(
				<Article article={this.props.project} key={this.props.project.article_id} title={true} date={false}/>
			)
		}else{
			return(
				<ArticleList isAdmin={isAdmin(usertype)} articles={this.props.projects} updateCB={getAllProjects} />
			)
		}
	}
}

export default connect(mapStateToProps)(Projects);
