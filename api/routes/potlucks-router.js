const restricted = require("../../auth/restricted-middleware.js");
const Potlucks= require("../data/models/potlucksModel.js");

const router = require("express").Router();

module.exports = router;

router.post("/", restricted, (req, res)=> { 
let potluck = req.body; 
})