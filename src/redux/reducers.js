//USER ACTIONS
import { UPDATE_USER_LIST, SET_ACTIVE_USER, USER_STATUS} from "./action-types";
//BLOG ACTIONS
import { ACTIVE_ARTICLE, ALL_ARTICLES, ALL_ARTICLES_TITLES} from "./action-types";
//TITLE ACTIONS
import {PROJECT_TITLES, BLOG_TITLES} from "./action-types";
//NAV ACTIONS
import {PARENT_TOPIC} from "./action-types";
//CALLBACKS
import { EDIT_ARTICLE_CB } from "./action-types";

const initialState = {
  userList: [],
  activeUser: {},
  user: {loggedin: false, isAdmin: false},
  article: {},
  articles: [],
  editArticleCB: null,
  blogTitles: [],
  projectTitles: [],
  parentTopic: ''
};
const rootReducer = (state = initialState, action) => {
    const newState = Object.assign({}, state);
  switch (action.type) {
    case UPDATE_USER_LIST:
        newState.userList = action.payload ;
        return newState;   
    case SET_ACTIVE_USER:
        newState.activeUser = action.payload;
        return newState;
    case USER_STATUS:
        newState.user = action.payload;
        if(action.payload.usertype ==1){
			newState.user.isAdmin = true;
		}else{
			newState.user.isAdmin = false;
		}
        return newState;
    case ACTIVE_ARTICLE:
        newState.article = action.payload;
        return newState;
    case ALL_ARTICLES:
        newState.articles = action.payload;
        return newState;
    case PROJECT_TITLES:
        newState.projectTitles = action.payload;
        return newState;
	case BLOG_TITLES:
        newState.blogTitles = action.payload;
        return newState;
    case PARENT_TOPIC:
		newState.parentTopic = action.payload;
		return newState;
    case EDIT_ARTICLE_CB:
		newState.editArticleCB = action.payload;
		return newState;
    default:
      return state;
  }
};
export default rootReducer;
