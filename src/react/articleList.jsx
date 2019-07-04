import React from 'react';
import ReactDOM from 'react-dom';
//sub comp
import ArticleStub from './articleStub.jsx';
//server api
import {getSimple} from '../api/api.js';


export default class ArticleList extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return(
           <div className="article-list" >
                {this.props.articles.map(p => (
                    <div key={p.article_id}>
                        <ArticleStub article={p} date={this.props.date} image={this.props.image} parent={this.props.parent} />
                    </div>
                    ))
                }
		<br />
           </div>
        )
    }
}

