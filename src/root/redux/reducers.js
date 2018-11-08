import { UPDATE_USER_LIST, SET_ACTIVE_USER,
         USER_STATUS, SIDEBAR_LINKS} from "./action-types";
const initialState = {
  userList: [],
  activeUser: {},
  user: {loggedin: false},
  sidebarLinks: [{text: "Home", href: "/"}]
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
    case SIDEBAR_LINKS:
        newState.sidebarLinks = action.payload;
        return newState;
    default:
      return state;
  }
};
export default rootReducer;
