const commonFetch = (url, methodApi, bodyAPI) => {
  fetch(url, {
    method: methodApi,
    body: bodyAPI,
  })
    .then(response => response.json())
    .then(responseJson => {
      return responseJson;
    });
};
export default commonFetch;
