const faker = require("faker");

exports.seed = async function(knex) {
  const foodItems = [];
  for (let i = 0; i < 150; i++) {
    let newFoodItem = {
      foodName: faker.commerce.productName(),
      potluckItemsUserId: (Math.random() * (54 - 1 + 1)) << 0,
      potluckItemsPotluckId: (Math.random() * (11 - 1 + 1)) << 0,
      servings: (Math.random() * (10 - 1 + 1)) << 0
    };
    foodItems.push(newFoodItem);
  }

  return knex("potluckItems")
    .del()
    .then(function() {
      return knex("potluckItems").insert(foodItems);
    });
};
