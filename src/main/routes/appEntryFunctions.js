import UsersLocationService from "../service/usersLocationService.js";
import Joi from "joi";

const userLocationService = new UsersLocationService();
const pathParamSchema = Joi.object({
  city: Joi.string().required(),
  radius: Joi.number().required(),
});

export const getUsers = async (req, res) => {
  try {
    const result = pathParamSchema.validate(req.params);

    if (result.error) {
      throw result;
    }
    /**
     * Gets All users near the provided city and with the miles of radius
     * @param  {} req.params.city
     * @param  {} req.params.radius
     */
    const usersInRadius = await userLocationService.getUsersInRadius(
      req.params.city,
      req.params.radius
    );

    /**
     * Sort filtered users based on distance from London
     */
    let replaceCriteria = ` miles from ${req.params.city}`;
    usersInRadius.sort(
      (a, b) =>
        parseFloat(a.distance.replace(replaceCriteria, "")) -
        parseFloat(b.distance.replace(replaceCriteria, ""))
    );
    console.log(
      `Number of matched users within radius of ${req.params.radius} miles or living in ${req.params.city} city: ${usersInRadius.length}`
    );

    /** Send response to client */
    res.status(200).json(usersInRadius);
  } catch (errors) {
    res.send(errors);
  }
};
