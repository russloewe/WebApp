//USER ACTIONS
import { UPDATE_USER_LIST, SET_ACTIVE_USER, USER_STATUS} from "./action-types";
//BLOG ACTIONS
import { ACTIVE_ARTICLE, ALL_ARTICLES} from "./action-types";
//PROJECT ACTIONS
import { ALL_PROJECTS} from "./action-types";

const initialState = {
  userList: [],
  activeUser: {},
  user: {loggedin: false},
  article: {},
  articles: [],
  projects : []
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
        return newState;
    case ACTIVE_ARTICLE:
        newState.article = action.payload;
        return newState;
    case ALL_ARTICLES:
        newState.articles = action.payload;
        return newState;
    case ALL_PROJECTS:
        newState.projects = action.payload;
        return newState;
    default:
      return state;
  }
};
export default rootReducer;
