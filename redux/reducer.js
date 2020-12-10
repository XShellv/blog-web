import { actionTypes } from "./actions";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  userInfo: null,
  topTags: null,
  loading: false,
  isAdmin: false,
  statusCode: 200,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case HYDRATE:
      // Attention! This will overwrite client state! Real apps should use proper reconciliation.
      return { ...state, ...action.payload };
    case actionTypes.SET_USERINFO:
      return { ...state, userInfo: action.payload };
    case actionTypes.SET_TOPTAGS:
      return { ...state, topTags: action.payload };
    case actionTypes.SET_LOADING:
      return { ...state, loading: action.payload };
    case actionTypes.AUTH_ADMIN:
      return { ...state, isAdmin: action.payload };
    case actionTypes.SET_STATUS:
      return { ...state, statusCode: action.payload };
    case actionTypes.INIT_STATUS:
      return { ...state, statusCode: 200 };
    default:
      return state;
  }
}

export default reducer;
