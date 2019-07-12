exports.seed = async function(knex) {
  const relationships = [];
  for (let i = 0; i < 50; i++) {
    let newRelationship = {
      userId: (Math.random() * (54 - 1 + 1)) << 0,
      potluckId: (Math.random() * (10 - 1 + 1)) << 0,
      role: (Math.random() * (1 - 0 + 1)) << 0,
      attendance: (Math.random() * (2 - 0 + 1)) << 0
    };
    relationships.push(newRelationship);
  }

  return await knex("usersPotlucks")
    .del()
    .then(function() {
      return knex("usersPotlucks").insert(relationships);
    });
};
