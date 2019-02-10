import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from "react-redux";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from 'react-router-dom';
//redux store functions
import { setEditArticleCB} from "./redux/actions.js";
//sub comp
import Article from './react/blog/article.jsx';
import EditArticle from './react/blog/editArticle.jsx';
//server api
import {getSimple} from './api/api.js';
//redux actions
import {setArticle, setHome} from "./redux/actions.js";

const mapStateToProps = state => {
    return{user: state.user,
		   home: state.home};
};

class Home extends React.Component {
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
                console.log(res);
                store.dispatch(setArticle(res));;
            }
        })
    }
    render() {
		const usertype = this.props.user.usertype;
        const editbutton = <EditArticle article={this.props.home} apiTarget="/edit" update={this.getHome} />
		const isAdmin = (type) => {
            if (type != 1){
                return false;
            }else{
                return true;
            }
        };
        return(
           <div>
              <Article article={this.props.home} title={false} date={false}/>
              {isAdmin(this.props.user.usertype) ? editbutton : ''}
           </div>
        )
    }
}

export default connect(mapStateToProps)(Home);
                
