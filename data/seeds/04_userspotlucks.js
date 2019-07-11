const faker = require("faker");

exports.seed = async function(knex) {
const relationships = [];
for(let i = 0; i < 50; i++) { 
    let newRelationship = { 
        userId: (Math.random() * (50 -1 + 1) ) << 0,
        potluckId: (Math.random() * (10 -1 + 1) ) << 0
    }
    relationships.push(newRelationship)
}

 return knex("usersPotlucks")
 .del()
 .then(function() { 
     return knex("usersPotlucks").insert({relationships})
 })
}