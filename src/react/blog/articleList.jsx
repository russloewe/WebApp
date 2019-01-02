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
           <div className="article-list" >
                {this.props.articles.map(p => (
                    <div key={p.article_id}>
                    <a className="subnav" href={this.props.parent+"/post/"+p.article_id+'/'+p.title} >
                        <div className="article-stub">
                            <img src={p.thumb_img} />
                            <h3>{p.title}</h3>
                            <p>{p.description}</p>
                        </div>
                    </a>
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
