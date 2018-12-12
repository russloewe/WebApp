//USER ACTIONS
import {UPDATE_USER_LIST, SET_ACTIVE_USER, USER_STATUS} from "./action-types";
export const updateUserList= data => ({type: UPDATE_USER_LIST, payload: data});
export const setActiveUser = user => ({type: SET_ACTIVE_USER, payload: user});
export const userStatus = status => ({type: USER_STATUS, payload: status});



//ARTICLE ACTIONS
import {ACTIVE_ARTICLE, ALL_ARTICLES, ALL_ARTICLES_TITLES } from "./action-types";
export const setArticle = article => ({type: ACTIVE_ARTICLE, payload: article});
export const Articles = articles => ({type: ALL_ARTICLES, payload: articles});


//TITLE ACTIONS
import { BLOG_TITLES, PROJECT_TITLES } from "./action-types";
export const setBlogTitles = articles => ({type: BLOG_TITLES, payload: articles});
export const setProjectTitles = articles => ({type: PROJECT_TITLES, payload: articles});

//NAV ACTIONS
import { PARENT_TOPIC } from "./action-types";
export const setParentTopic = topic => ({type: PARENT_TOPIC, payload: topic});

//CALLBACKS
import { EDIT_ARTICLE_CB } from "./action-types";
export const setEditArticleCB = cb => ({type: EDIT_ARTICLE_CB, payload: cb});

//Home
import {SET_HOME} from "./action-types";
export const setHome = home => ({type: SET_HOME, payload: home});
