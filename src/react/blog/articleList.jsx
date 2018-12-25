import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from "react-redux";
import { Provider } from "react-redux";
//sub comp
import Article from './article.jsx';

import AddArticle from './addArticle.jsx';
//redux store
import {allProjects} from "../../redux/actions.js";
//server api
import {getSimple} from '../../api/api.js';

const mapStateToProps = state => {
    return{isAdmin: state.user.isAdmin,
		   parent: state.parentTopic,
		   editArticleCB: state.editArticleCB};
};


class ArticleList extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        const addbutton =  <AddArticle apiTarget={this.props.parent+"/add"} update={this.props.editArticleCB} />;

        return(
           <div >
                {this.props.articles.map(p => (
                    <div key={p.article_id}>
                    <Article  article={p} title={true} date={false}/>
                     </div>
                    ))
                }
		<br />
                {this.props.isAdmin ? addbutton : ''}
           </div>
        )
    }
}
export default connect(mapStateToProps)(ArticleList);
