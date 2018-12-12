import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from "react-redux";
import { Provider } from "react-redux";
//sub comp
import Article from './article.jsx';
import EditArticle from './editArticle.jsx';
import AddArticle from './addArticle.jsx';
//redux store
import {allProjects} from "../../redux/actions.js";
//server api
import {getSimple} from '../../api/api.js';



export default class ArticleList extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        const addbutton =  <AddArticle apiTarget="/projects/add" update={this.props.updateCB} />;
        const editbutton = (p) => { 
			return(
				<EditArticle article={p} apiTarget="/projects/edit" update={this.props.updateCB} />
				)};
        return(
           <div >
                {this.props.articles.map(p => (
                    <div key={p.article_id}>
                    <Article article={p} key={p.article_id} title={true} date={false}/>
                     {this.props.isAdmin ? editbutton(p) : ''}
                     </div>
                    ))
                }
                {this.props.isAdmin ? addbutton : ''}
           </div>
        )
    }
}
