import {ACTIVE_ARTICLE, SIDEBAR_LINKS } from "./action-types";
export const setArticle = article => ({type: ACTIVE_ARTICLE, payload: article});
export const sidbarLinks = links => ({type: SIDEBAR_LINKS, payload: links});
