/*
 * file: reducers.js
 * author: russ loewe
 * email: russloewe@gmail.com
 * desc: 
 *          Set the initial state of the store's data and 
 * apply action to data as it is stored.
 */

//USER ACTIONS
import {USER_STATUS} from "./action-types";

// Initial State Set Here 
const initialState = {
  user: {loggedin: false},
 };
 
// Reducer 
const rootReducer = (state = initialState, action) => {
    const newState = Object.assign({}, state);
  switch (action.type) {
    case USER_STATUS:
        newState.user = action.payload;
        return newState;
    default:
      return state;
  }
};

export default rootReducer;
