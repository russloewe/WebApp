// SETTERS
import {SET_USER, SET_PAGE, SET_PAGE_TITLES,
        SET_SECTION_TOPIC, SET_SECTION_TITLES} from "./action-types";
        
export const setUser = data => ({type: SET_USER,
                                 payload: data});
                                 
export const setPage = data => ({type: SET_PAGE,
                                 payload: data});
                                 
export const setPageTitles = data => ({type: SET_PAGE_TITLES,
                                       payload: data});

export const setSectionTopic = data => ({type: SET_SECTION_TOPIC,
                                         payload: data});
                                         
export const setSectionTitles = data => ({type: SET_SECTION_TITLES,
                                          payload: data});
