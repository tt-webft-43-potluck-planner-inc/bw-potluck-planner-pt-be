const restricted = require("../../auth/restricted-middleware.js");
const Food = require("../../data/models/foodModel.js");
const Potlucks = require("../../data/models/potlucksModel.js");
const UsersPotlucks = require("../../data/models/usersPotlucksModel.js");

const router = require("express").Router();

module.exports = router;

router.post("/", restricted, async (req, res) => {
  let { potluckId, foodCategory, foodDescription, servings } = req.body;
  let potluck = await Potlucks.findById(potluckId);
  let relationship = await UsersPotlucks.findByUserIdAndPotluckId(
    req.id,
    potluckId
  );
  console.log(potluck);
  console.log(relationship);
  if (!potluckId || !foodCategory || !foodDescription || !servings) {
    res.status(400).json({
      message:
        "please provide a potluckId, foodCategory, foodDescription, and # of servings"
    });
  }
  try {
    if (!potluck) {
      res.status(404).json({
        message: "no such potluck"
      });
    } else if (relationship && relationship.role === 1 || relationship.role === 0) {
      let foodToInsert = {
        userId: req.id,
        potluckId,
        foodCategory,
        foodDescription,
        servings,
      };
      await Food.insert(foodToInsert);
      res.status(200).json(req.body);
    } else {
      res.status(400).json({
        message:
          "you are not a member of this potluck, so you cannot add food to it"
      });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});
