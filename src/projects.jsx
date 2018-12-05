import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from "react-redux";
import { Provider } from "react-redux";
//sub comp
import Article from './react/blog/article.jsx';
import EditArticle from './react/blog/editArticle.jsx';
import AddArticle from './react/blog/addArticle.jsx';
//redux store
import {allProjects} from "./redux/actions.js";
//server api
import {getSimple} from './api/api.js';

const mapStateToProps = state => {
    return{projects: state.projects,
		   user: state.user};
};

class Projects extends React.Component {
    constructor(props){
        super(props);
        this.getAllProjects();
    }
    getAllProjects(){
        getSimple('/projects/all', function(err,res){
            if(err){
                console.log(err);
            }else{
                console.log(res);
                store.dispatch(allProjects(res));
            }
        })
    }
    
    render() {
		const usertype = this.props.user.usertype;
        const addbutton =  <AddArticle apiTarget="/projects/add" update={this.getAllProjects} />;
        const editbutton = (p) => { 
			return(
				<EditArticle article={p} apiTarget="/projects/edit" update={this.getAllProjects} />
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
                {this.props.projects.map(p => (
                    <div key={p.article_id}>
                    <Article article={p} key={p.article_id}/>
                     {isAdmin(this.props.user.usertype) ? editbutton(p) : ''}
                     </div>
                    ))
                }
                {isAdmin(this.props.user.usertype) ? addbutton : ''}
           </div>
        )
    }
}

export default connect(mapStateToProps)(Projects);
                
