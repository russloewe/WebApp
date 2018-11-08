import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from "react-redux";
import { Provider } from "react-redux";
//sub comp
import Article from './react/article.jsx';
//redux store
import store from "./redux/store";
window.projects_store = store;


const mapStateToProps = state => {
    return{article: state.article};
};

class Projects extends React.Component {
    constructor(props){
        super(props);
    }
    
    render() {
        return(
        <Provider store={projects_store}>
           <div >
              <Article />
           </div>
        </Provider>
        )
    }
}

export default connect(mapStateToProps)(Projects);
                
