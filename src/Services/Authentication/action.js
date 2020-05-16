/* eslint-disable space-infix-ops */
/* eslint-disable prettier/prettier */
import {
  TOGGLE_UPDATE,
  TOGGLE_DELETE,
  STORE_CONCEPT,
  TOGGLE_CREATE,
  DELETE_UNABLE,
  CREATE_UNABLE,
  UPDATE_UNABLE,
  API_FAILURE,
  RESET_ALL,
} from './constant';
import config from '../../config/env';
import CommonFetch from './commonFetch';
export const toggleCreate = (username, email, name, phone) => dispatch => {
  fetch(config.apiURl, {
    method: 'POST',
    headers: {Accept: 'application/json', 'content-type': 'application/json'},
    body: JSON.stringify({
      username: username,
      email: email,
      name: name,
      phone_number: Number(phone),
    }),
  })
    .then(response => response.json())
    .then(responseJson => {
      dispatch(toggleConcept);
      if (responseJson.status === true) {
        dispatch({
          type: TOGGLE_CREATE,
        });
      } else {
        dispatch({
          type: CREATE_UNABLE,
        });
      }
    });
};

export const toggleUpdate = (username, email, name, phone, id) => dispatch => {
  fetch(config.apiURl + config.updateEmployee + id, {
    method: 'PUT',
    headers: {Accept: 'application/json', 'content-type': 'application/json'},
    body: JSON.stringify({
      username: username,
      email: email,
      name: name,
      phone_number: Number(phone),
    }),
  })
    .then(response => response.json())
    .then(responseJson => {
      dispatch(toggleConcept);
      if (responseJson.status === true) {
        dispatch({
          type: TOGGLE_UPDATE,
        });
      } else {
        dispatch({
          type: UPDATE_UNABLE,
        });
      }
    });
};

export const toggleDelete = id => dispatch => {
  // console.warn(config.apiURl + config.updateEmployee + id);
  fetch(config.apiURl + config.updateEmployee + id, {
    method: 'DELETE',
    headers: {Accept: 'application/json', 'content-type': 'application/json'},
  })
    .then(response => response.json())
    .then(responseJson => {
      dispatch(toggleConcept);
      if (responseJson.status === true) {
        dispatch({
          type: TOGGLE_DELETE,
        });
      } else {
        dispatch({
          type: DELETE_UNABLE,
        });
      }
    });
};

export const toggleConcept = () => dispatch => {
  // console.warn('called');
  fetch(config.apiURl, {
    method: 'GET',
    headers: {Accept: 'application/json', 'content-type': 'application/json'},
  })
    .then(response => response.json())
    .then(responseJson => {
      if (responseJson.status === true) {
        dispatch({
          type: STORE_CONCEPT,
          data: responseJson.data,
        });
      } else {
        dispatch({
          type: API_FAILURE,
        });
      }
    });
};

export const resetAll = () => dispatch => {
  dispatch({
    type: RESET_ALL,
  });
};
// export const demofetch = () => dispatch => {
//   const result = CommonFetch(
//     'http://dummy.restapiexample.com/api/v1/employees',
//     'GET',
//     null,
//   );
//   console.log(result);
// };

// export const toggleSearch = newApi => dispatch => {
//   fetch(newApi, {
//     method: 'GET',
//   })
//     .then(response => response.json())
//     .then(responseJson => {
//       dispatch(toggleConcept());
//       dispatch({
//         type: STORE_SEARCH,
//         data: responseJson,
//         // navigation.navigate('StoreList', {storeData: this.state.storeData});
//       });
//     });
// };
