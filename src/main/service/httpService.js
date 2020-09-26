import {
    request
} from "./requestService.js";
import {
    httpMethod,
    errorSources
} from "../constant/constants.js";

/**
 * Sends a get request
 * @param {String} uri uri
 * @param {Object} headers header object
 * @param {Object} options json, retry, timeout
 * @returns {Object} response from request
 */
function get(uri, headers = {}, options = {}) {
    const payload = {
        headers,
        method: httpMethod.GET
    };

    Object.assign(payload, getDefaultOptions(uri), options);

    return invoke(payload, options.parse);
}

/**
 * Returns the default set of options
 * @param {String} uri uri
 * @returns {Object} set of default options
 */
function getDefaultOptions(uri) {
    return {
        json: true,
        resolveWithFullResponse: true,
        retry: 3,
        timeout: 2000,
        uri
    };
}

/**
 * Returns request and optionally parses the response
 * @param {Object} payload passed in
 * @param {Boolean} parse set to false to opt out of parsing
 * @returns {Object} payload parsed and returned
 */
function invoke(payload, parse = true) {
    if (parse) {
        return request(payload)
            .then((response) => {
                return {
                    body: response.body,
                    statusCode: response.statusCode
                };
            })
            .catch((exception) => {
                exception.source = errorSources.DWP_API;
                throw exception;
            });
    }

    return request(payload);
}

const _get = get;
export {
    _get as get
};