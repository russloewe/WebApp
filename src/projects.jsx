import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from "react-redux";
import { Provider } from "react-redux";
//sub comp
import Article from './react/blog/article.jsx';


import AddArticle from './react/blog/addArticle.jsx';
//redux store
import {allProjects} from "./redux/actions.js";
//server api
import {getSimple} from './api/api.js';

const mapStateToProps = state => {
    return{projects: state.projects,
		   user: state.user};
};

function getAllProjects(){
        getSimple('/projects/all', function(err,res){
            if(err){
                console.log(err);
            }else{
                console.log(res);
                store.dispatch(allProjects(res));
            }
        })
}
function getProject(id){
        getSimple('/projects/article?id='+id, function(err,res){
            if(err){
                console.log(err);
            }else{
                console.log(res);
                store.dispatch(allProjects([res]));
            }
        })
}
    
class Projects extends React.Component {
    constructor(props){
        super(props);
        if(this.props.match.params.id){
			getProject(this.props.match.params.id);
		}else{
			getAllProjects();
		}
        
    }

    render() {
		const usertype = this.props.user.usertype;
        const addbutton =  <AddArticle apiTarget="/projects/add" update={getAllProjects} />;
       
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
                    <Article article={p} key={p.article_id} title={true} date={false} usertype={this.props.user.usertype} parent={"projects"}/>
                     {isAdmin(usertype) ? editbutton(p) : ''}
                     </div>
                    ))
                }
                {isAdmin(usertype) ? addbutton : ''}
           </div>
        )
    }
}

export default connect(mapStateToProps)(Projects);
