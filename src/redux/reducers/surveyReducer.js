import { SET_SURVEYS } from '../actionTypes';

export default (state = {
  surveys: [],
  status: '',
  
}, action) => {
  switch(action.type) {
    case SET_SURVEYS:
      return {
        ...state, 
        surveys: action.payload
      }
      default:
        return state;
  }
};

 