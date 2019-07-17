const restricted = require("../../auth/restricted-middleware.js");
const Potlucks = require("../../data/models/potlucksModel.js");
const UsersPotlucks = require("../../data/models/usersPotlucksModel.js");
const Users = require("../../data/models/usersModel.js");
const PotluckRequirements = require("../../data/models/potluckRequirementsModel.js");

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

router.get("/user/", restricted, async (req, res) => {
  try {
    let potlucks = await Potlucks.findByUserId(req.id);
    res.status(200).json(potlucks);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/user/add", restricted, async (req, res) => {
  try {
    let { potluckId, role, email } = req.body;
    if (!potluckId || !role || !email) {
      res.status(400).json({
        message:
          "please provide a the potluckId of the potluck to add, as well as user's email and role"
      });
    }
    let user = await Users.findByEmail(email);
    let toInsert = {
      userId: user.id,
      potluckId,
      role,
      attendance: 2
    };
    await UsersPotlucks.insert(toInsert);
    res.status(200).json(toInsert);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/mine", restricted, async (req, res) => {
  try {
    let potlucks = await Potlucks.findAdminPotlucks(req.id)
    res.status(200).json(potlucks);
  } catch (error) {
    res.status(500).error;
  }
});

router.post("/reqs/", restricted, async (req, res) => {
  try {
    let {
      foodCategory,
      foodDescription,
      potluckId,
      servings,
      fufilled
    } = req.body;
    let relationship = await UsersPotlucks.findByUserIdAndPotluckId(
      req.id,
      potluckId
    );
    let response = {
      foodCategory,
      foodDescription,
      potluckId,
      servings,
      fufilled
    };
    if (relationship.role === 0) {
      await PotluckRequirements.insert(response);
      res.status(200).json(response);
    } else {
      res.status(400).json({ message: "you are not an admin of this potluck" });
    }
  } catch (error) {
    res.status(500).error;
  }
});
