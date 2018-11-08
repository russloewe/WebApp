import { SIMPLE_DATABASE_UPDATE_USERS, SIMPLE_DATABASE_RESPONSE_STATUS, 
         USER_STATUS, ACTIVE_ARTICLE, SIDEBAR_LINKS} from "./action-types";
const initialState = {
  simpleDatabase: {users: []},
  simpleDatabaseStatus: false,
  user: {loggedin: false},
  sidebarLinks: [{text: "Home", href: "/"}],
  article: ''
};
const rootReducer = (state = initialState, action) => {
    const newState = Object.assign({}, state);
  switch (action.type) {
    case SIMPLE_DATABASE_UPDATE_USERS:
        newState.simpleDatabase.users = action.payload ;
        return newState;   
    case SIMPLE_DATABASE_RESPONSE_STATUS:
        newState.simpleDatabaseStatus = action.payload;
        return newState;
    case USER_STATUS:
        newState.user = action.payload;
        return newState;
    case ACTIVE_ARTICLE:
        newState.article = action.payload;
        return newState;
    case SIDEBAR_LINKS:
        newState.sidebarLinks = action.payload;
        return newState;
    default:
      return state;
  }
};
export default rootReducer;
