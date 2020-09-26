import requestPromiseRetry from "promise-request-retry";

/**
 * Sends a payload to requestPromiseRetry
 * @param {Object} payload to send to the request Promise Retry
 * @returns {Promise} response
 */
function request(payload) {
  return requestPromiseRetry(payload);
}

const _request = request;
export { _request as request };
