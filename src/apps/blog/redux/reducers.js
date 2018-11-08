import { ACTIVE_ARTICLE, SIDEBAR_LINKS} from "./action-types";
const initialState = {
  sidebarLinks: [{text: "Home", href: "/"}],
  article: ''
};

const rootReducer = (state = initialState, action) => {
    const newState = Object.assign({}, state);
  switch (action.type) {
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
