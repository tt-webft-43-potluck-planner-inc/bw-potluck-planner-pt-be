const restricted = require("../../auth/restricted-middleware.js");
const Potlucks = require("../../data/models/potlucksModel.js");
const UsersPotlucks = require("../../data/models/usersPotlucksModel.js");

const router = require("express").Router();

module.exports = router;

router.post("/", restricted, async (req, res) => {
  try {
    let newPotluck = req.body;
    let {
      locationName,
      locationAddress,
      locationStreet,
      locationState,
      locationCity,
      locationCountry,
      locationPostcode
    } = req.body;
    if (
      !locationName ||
      !locationAddress ||
      !locationStreet ||
      !locationState ||
      !locationCity ||
      !locationCountry ||
      !locationPostcode
    ) {
      res.status(400).json({
        message:
          "please provide a nane, address, street, state, city, country and postalcode"
      });
    }
    await Potlucks.insert(newPotluck);
    let savedPotluck = await Potlucks.findByLocation(req.body.locationName);

    const newRelationship = {
      userId: req.id,
      potluckId: savedPotluck.id,
      role: 0,
      attendance: 2
    };
    await UsersPotlucks.insert(newRelationship);
    let savedRelationship = await UsersPotlucks.findByUserIdAndPotluckId(
      req.id,
      savedPotluck.id
    );

    res.status(200).json([savedPotluck, savedRelationship]);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/user/:userId", restricted, async (req, res) => {
  try {
    let potlucks = await Potlucks.findByUserId(req.id);
    res.status(200).json(potlucks);
  } catch (error) {
    res.status(500).json(error);
  }
});
