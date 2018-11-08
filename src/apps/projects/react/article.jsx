import React from 'react';
import ReactDOM from 'react-dom';
import {getSimpleId} from "../api/api.js";
import {setArticle} from '../redux/actions';
import { connect } from "react-redux";

const mapStateToProps = state => {
    return{article: state.article};
};

class Article extends React.Component {
    constructor(props){
        super(props);
        this.getArticle = this.getArticle.bind(this);
    }
    
    getArticle() {
        getSimpleId(1, function (err, data) {
            if (err){
                console.log("Error getting article");
            }else{
                store.dispatch(setArticle(data));
            }
        })
    }
    
    componentDidMount() {
        this.getArticle();
    }
    
    render() {
        return(
           <div id="article">
              <div dangerouslySetInnerHTML={{__html:this.props.article}} />
           </div>
        )
    }
}

export default connect(mapStateToProps)(Article);
                
