const faker = require("faker");
const db = require("../models/usersModel.js");
exports.seed = async function(knex) {
    const potlucks = [];
    for(let i  = 0; i < 10; i++) { 
        let newPotluck = { 
            locationName: `${faker.company.companyName()}`,
            locationAddress: `${faker.address.streetAddress()}, ${faker.address.city()}, ${faker.address.stateAbbr()}, ${faker.address.country()}`
        }
        potlucks.push(newPotluck)
    }
    return knex("potlucks")
    .del()
    .then(function() {
      return knex("potlucks").insert(potlucks);
    });
}