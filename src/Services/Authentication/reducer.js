import {
  TOGGLE_UPDATE,
  TOGGLE_DELETE,
  STORE_SEARCH,
  STORE_CONCEPT,
  TOGGLE_CREATE,
  DELETE_UNABLE,
  CREATE_UNABLE,
  UPDATE_UNABLE,
  RESET_ALL,
  API_FAILURE,
} from './constant';
const initialState = {
  isCreated: 0,
  isConceptLoading: true,
  conceptData: '',
  isUpdated: 0,
  isDeleted: 0,
  isFailed: 0,
};
const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case STORE_SEARCH:
      return {
        ...state,
        searchData: action.data,
        isSearching: true,
      };
    case STORE_CONCEPT:
      return {
        ...state,
        conceptData: action.data,
        isConceptLoading: false,
      };
    case TOGGLE_CREATE:
      return {
        ...state,
        isCreated: true,
      };
    case TOGGLE_UPDATE:
      return {
        ...state,
      };
    case TOGGLE_DELETE:
      return {
        ...state,
      };
    case CREATE_UNABLE:
      return {
        ...state,
        isCreated: 1,
      };
    case UPDATE_UNABLE:
      return {
        ...state,
        isUpdated: 1,
      };
    case DELETE_UNABLE:
      return {
        ...state,
        isDeleted: 1,
      };
    case RESET_ALL:
      return {
        ...state,
        isCreated: 0,
        isUpdated: 0,
        isDeleted: 0,
      };
    case API_FAILURE:
      return {
        ...state,
        isFailed: 1,
      };
    default:
      return state;
  }
};

export default homeReducer;
