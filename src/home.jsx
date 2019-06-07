import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
//redux store functions
//sub comp
import Article from './react/blog/article.jsx';
//server api
import {getSimple} from './api/api.js';


export default class Home extends React.Component {
    constructor(props){
        super(props);
        this.state ={home: ''};
        this.getHome = this.getHome.bind(this);
        this.getHome();
    store.dispatch(setEditArticleCB(this.getHome));
    }
    getHome(){
        getSimple('/home', function(err,res){
            if(err){
                console.log(err);
            }else{
                store.dispatch(setArticle(res[0]));;
            }
        })
    }
    render() {
        return(
           <div>
              <Article article={this.props.home} title={false} date={false}/>
           </div>
        )
    }
}


                
