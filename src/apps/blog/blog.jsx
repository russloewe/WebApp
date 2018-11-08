import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from "react-redux";
import { BrowserRouter as Router, Route } from 'react-router-dom';
//sub comp
import Article from './react/article.jsx';
//redux store
import store from "./redux/store";
window.blog_store = store;

const mapStateToProps = state => {
    return{article: state.article};
};

class Blog extends React.Component {
    constructor(props){
        super(props);
    }
    
    render() {
        return(
           
           <div >
              <Article />
           </div>
        )
    }
}

export default connect(mapStateToProps)(Blog);
                
