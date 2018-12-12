import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from "react-redux";
import { Provider } from "react-redux";
//sub comp
import Article from './react/blog/article.jsx';
import ArticleList from './react/blog/articleList.jsx';
import AddArticle from './react/blog/addArticle.jsx';
//redux store
import {Articles, setArticle, setProjectTitles, setParentTopic, setEditArticleCB} from "./redux/actions.js";
import {PROJECTS} from "./redux/topic-types.js";
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
                store.dispatch(Articles(res));
            }
        });
        getAllProjectsTitles();
}

function getAllProjectsTitles(){
        getSimple('/projects/all/titles', function(err,res){
            if(err){
                console.log(err);
            }else{
                console.log(res);
                store.dispatch(setProjectTitles(res));
            }
        })
}

function getProjectCB(id){
	return(
		function getProject(){
			getSimple('/projects/article?id='+id, function(err,res){
				if(err){
					console.log(err);
				}else{
					console.log(res);
					store.dispatch(setArticle(res));
				}
			});
			getAllProjectsTitles();
		 }
	)
}
	
function getProject(id){
        getSimple('/projects/article?id='+id, function(err,res){
            if(err){
                console.log(err);
            }else{
                console.log(res);
                store.dispatch(setArticle(res));
            }
        });
        getAllProjectsTitles();
}
    
class Projects extends React.Component {
    constructor(props){
        super(props);
        //get the list of project titles
        getAllProjectsTitles();
        if(this.props.match.params.id){
			getProject(this.props.match.params.id);
			store.dispatch(setEditArticleCB(getProjectCB(this.props.match.params.id)));
		}else{
			getAllProjects();
			store.dispatch(setEditArticleCB(getAllProjects));
		}
		store.dispatch(setParentTopic(PROJECTS));
		
    }

    render() {
		if(this.props.match.params.id){
			return(
				<Article article={this.props.project} key={this.props.project.article_id} title={true} date={false}/>
			)
		}else{
			return(
				<ArticleList articles={this.props.projects}  />
			)
		}
	}
}

export default connect(mapStateToProps)(Projects);
