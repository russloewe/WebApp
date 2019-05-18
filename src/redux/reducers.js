//USER ACTIONS
import {SET_ACTIVE_USER} from "./action-types";
//BLOG ACTIONS
import { ACTIVE_ARTICLE,} from "./action-types";
//TITLE ACTIONS
import {PAGE_TITLES} from "./action-types";

const initialState = {
  user: {loggedin: false},
  page: {},
  pageTitles: [],
  sectionTopic: '',
  sectionTitles: []
};
const rootReducer = (state = initialState, action) => {
    const newState = Object.assign({}, state);
  switch (action.type) {
    case SET_USER:
        newState.user = action.payload;
        return newState;
    case SET_PAGE:
        newState.page = action.payload;
        return newState;
    case SET_PAGE_TITLES:
        newState.pageTitles = action.payload;
        return newState;
    case SET_SECTION_TOPIC:
		newState.sectionTopic = action.payload;
		return newState;
    case SET_SECTION_TITLES:
        newState.sectionTitles = action.payload;
        return newState;
    default:
      return state;
  }
};
export default rootReducer;
