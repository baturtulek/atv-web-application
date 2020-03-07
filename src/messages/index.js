
const { RESPONSE_MESSAGE } = require('./RESPONSE_MESSAGE');
const { URL_MESSAGE } = require('./URL_MESSAGE');

const getMessageFromURL = (ROUTE_NAME, query) => {
  return {
    successMessage: getMessage(ROUTE_NAME, query.success),
    errorMessage: getMessage(ROUTE_NAME, query.error),
  };
};

const getMessage = (ROUTE_NAME, query) => {
  if (query == undefined) {
    return null;
  }
  return `${ROUTE_NAME} ${RESPONSE_MESSAGE[query]}`;
};

module.exports = {
  RESPONSE_MESSAGE,
  URL_MESSAGE,
  getMessageFromURL,
};
