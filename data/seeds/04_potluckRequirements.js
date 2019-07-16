const faker = require("faker");

exports.seed = async function(knex) {
  const requirements = [];
  for (let i = 0; i < 100; i++) {
    let newRequirement = {
      foodDescription: faker.commerce.productName(),
      foodCategory: faker.commerce.productAdjective(),
      potluckId: (Math.random() * (54 - 1 + 1)) << 0,
      servings: (Math.random() * (10 - 1 + 1)) << 0
    };
    requirements.push(newRequirement);
  }

  return knex("potluckRequirements")
    .del()
    .then(function() {
      return knex("potluckRequirements").insert(requirements);
    });
};
