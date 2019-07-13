const restricted = require("../../auth/restricted-middleware.js");
const Potlucks = require("../../data/models/potlucksModel.js");
const UsersPotlucks = require("../../data/models/usersPotlucksModel.js");

const router = require("express").Router();

module.exports = router;

router.post("/", restricted, async (req, res) => {
  try {
    let newPotluck = req.body;
    let {
      locationAddress,
      locationStreet,
      locationState,
      locationCity,
      locationCountry,
      locationPostcode
    } = req.body;
    if (
      !locationAddress ||
      !locationStreet ||
      !locationState ||
      !locationCity ||
      !locationCountry ||
      !locationPostcode
    ) {
      res.status(400).json({
        message:
          "please provide a address, street, state, city, country and postalcode"
      });
    }
    let savedPotluck = await Potlucks.insert(newPotluck);
    const newRelationship = {
      userId: req.id,
      potluckId: savedPotluck.id,
      role: 0,
      attendance: 2
    };
    let savedRelationship = await UsersPotlucks.insert(newRelationship);
    res.status(200).json([savedPotluck, savedRelationship]);
  } catch (error) {
    res.status(500).json(error);
  }
});
