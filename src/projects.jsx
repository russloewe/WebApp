import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from "react-redux";
import { Provider } from "react-redux";
//sub comp
import Article from './react/blog/article.jsx';
//redux store
import {allProjects} from "./redux/actions.js";
//server api
import {getSimple} from './api/api.js';

const mapStateToProps = state => {
    return{projects: state.projects};
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
        return(
           <div >
              <Article articles={this.props.projects}/>
           </div>
        )
    }
}

export default connect(mapStateToProps)(Projects);
                
