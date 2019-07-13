const faker = require("faker");

exports.seed = async function(knex) {
  const potlucks = [];
  for (let i = 0; i < 10; i++) {
    let newPotluck = {
      locationName: faker.company.companyName(),
      locationStreet: `${faker.address.streetName()}, ${faker.address.streetSuffix()}`,
      locationAddress: (Math.random() * (99999 - 100 + 1)) << 0,
      locationUnit: faker.address.secondaryAddress(),
      locationState: faker.address.state(),
      locationCity: faker.address.city(),
      locationCountry: faker.address.countryCode(),
      locationPostcode: faker.address.zipCode()
    };
    potlucks.push(newPotluck);
  }
  return knex("potlucks")
    .del()
    .then(function() {
      return knex("potlucks").insert(potlucks);
    });
};
