import {UPDATE_USER_LIST, SET_ACTIVE_USER, USER_STATUS, SIDEBAR_LINKS } from "./action-types";
export const updateUserList= data => ({type: UPDATE_USER_LIST, payload: data});
export const setActiveUser = user => ({type: SET_ACTIVE_USER, payload: user});
export const userStatus = status => ({type: USER_STATUS, payload: status});
export const sidbarLinks = links => ({type: SIDEBAR_LINKS, payload: links});
