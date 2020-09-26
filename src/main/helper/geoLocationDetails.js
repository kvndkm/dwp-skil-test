import geolib from "geolib";
import {
    get
} from "../service/httpService.js";

import {
    options
} from "../constant/constants.js";

const {
    getDistance,
    convertDistance
} = geolib;

export default class GeoLocationDetails {
    distanceBetween = (from, to) => {
        const distanceInMetres = getDistance(from, to);
        return convertDistance(distanceInMetres, "mi");
    }

    getLocationDetails = async (lat, long) => {
        const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${long}&localityLanguage=en`;
        const results = await get(url, null, options)
        return results;
    };

}