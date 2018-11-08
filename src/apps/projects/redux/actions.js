import {SIMPLE_DATABASE_UPDATE_USERS, SIMPLE_DATABASE_RESPONSE_STATUS, USER_STATUS, ACTIVE_ARTICLE } from "./action-types";
export const databaseUpdateUsers= data => ({type: SIMPLE_DATABASE_UPDATE_USERS, payload: data});
export const databaseStatus = status => ({type: SIMPLE_DATABASE_RESPONSE_STATUS, payload: status});
export const userStatus = status => ({type: USER_STATUS, payload: status});
export const setArticle = article => ({type: ACTIVE_ARTICLE, payload: article});
export const sidbarLinks = links => ({type: SIDEBAR_LINKS, payload: links});
