const apiURl = 'https://admin-stage.priskoll.occdev.axfood.se';
const conceptURL = 'https://admin-rel.priskoll.occdev.axfood.se';
const baseURL = 'axfood';
const security = 'axfood-security';
const tempProductScan = 'axfood-product-scan';

const apiConfig = {
  authenticationApi: {
    loginUserHandle: `/${baseURL}/${security}/login`,
  },
  tempStoreApi: {
    storeListHandle: `/${baseURL}/${tempProductScan}/stores`,
    searchListHandle: `/${baseURL}/${tempProductScan}/searchResults/`,
    conceptListHandle: `/${baseURL}/${tempProductScan}/concepts?`,
  },
};

export default {
  apiURl,
  apiConfig,
  conceptURL,
};
