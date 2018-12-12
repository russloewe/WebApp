//USER ACTIONS
import {UPDATE_USER_LIST, SET_ACTIVE_USER, USER_STATUS} from "./action-types";
export const updateUserList= data => ({type: UPDATE_USER_LIST, payload: data});
export const setActiveUser = user => ({type: SET_ACTIVE_USER, payload: user});
export const userStatus = status => ({type: USER_STATUS, payload: status});



//ARTICLE ACTIONS
import {ACTIVE_ARTICLE, ALL_ARTICLES, ALL_ARTICLES_TITLES } from "./action-types";
export const setArticle = article => ({type: ACTIVE_ARTICLE, payload: article});
export const allArticles = articles => ({type: ALL_ARTICLES, payload: articles});
export const allArticlesTitles = articles => ({type: ALL_ARTICLES_TITLES, payload: articles});

//Home
import {SET_HOME} from "./action-types";
export const setHome = home => ({type: SET_HOME, payload: home});
