import { get } from "./httpService.js";
import { options } from "../constant/constants.js";
import GeoLocationDetails from "../helper/geoLocationDetails.js";

const geoLocationDetails = new GeoLocationDetails();

export default class UsersLocationService {
  /**
   * Get all users from, calling the REST service bpdts test app
   */
  getAllUsers = () =>
    get("https://bpdts-test-app.herokuapp.com/users", null, options);

  /**
   * Get all users that are based on the provided city
   * @param  {} city
   */
  getCityBasedUsers = (city) =>
    get(
      `https://bpdts-test-app.herokuapp.com/city/${city}/users`,
      null,
      options
    );
  /**
   * Gets all users and filter the users that are with in the given radius
   * from the provided city coordicates
   * @param  {} city
   * @param  {} radius
   */
  getUsersInRadius = async (city, radius) => {
    let allUsers = await this.getAllUsers();
    let cityBasedUsers = await this.getCityBasedUsers(city);
    console.log(`Total number of users: ${allUsers.body.length}`);
    /** Map on All Users with related city coordinates */
    return allUsers.body.filter((au) => {
      let cityCoord = {
        latitude: au.latitude,
        longitude: au.longitude,
      };

      /** filter users calculating distance between above coordinates fetched
       * and city based coordinates with in the given radius
       */
      let cbuFilteredUsers = cityBasedUsers.body.filter((cbu) => {
        let distance = geoLocationDetails.distanceBetween(cityCoord, {
          latitude: cbu.latitude,
          longitude: cbu.longitude,
        });
        /** Add distance attribute to the object when the distance
         * is with in the radius of given city limits
         */
        if (distance <= radius) {
          cbu = this.updateDistanceInUser(cbu, distance, city);
        }
        /** checks if distance is with in radius of given city coordinates */
        return distance <= radius;
      });
      if (cbuFilteredUsers.length > 0) {
        au = this.updateDistanceInUser(au, cbuFilteredUsers[0].distance, city);
      }
      return cbuFilteredUsers.length > 0;
    });
  };

  updateDistanceInUser = (user, distance, city) => {
    let o = Object.assign({}, user);

    let formattedDistance =
      typeof distance !== "string"
        ? `${distance} miles from ${city}`
        : distance;
    o.distance = formattedDistance;

    user = Object.assign(user, o);
    console.log(user);
    return user;
  };
  /**
   * To check and update other user related imnformation for FUTURE USE
   *
   * @param  {} users
   */
  addLocationDetails = async (users) => {
    for (const index in users) {
      const user = users[index];
      const locationDetails = await geoLocationDetails.getLocationDetails(
        user.latitude,
        user.longitude
      );
      user.countryCode = locationDetails.body.countryCode;
      user.countryName = locationDetails.body.countryName;
      user.city = locationDetails.body.city;
      user.postcode = locationDetails.body.postcode;
      Object.assign(user, users[index]);
    }
  };
}
