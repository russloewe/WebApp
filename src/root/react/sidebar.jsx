import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from "react-redux";

const mapStateToProps = state => {
    return{sidebarLinks: state.sidebarLinks};
};

function SideBar(props){

  return (
  <div>
    <ul>
        {props.sidebarLinks.map(link => (
            <li key={link.text}><a href={link.href}>{link.text}</a></li>
            )
        )}
    </ul>
    
  </div>
  );
}

export default connect(mapStateToProps)(SideBar);
