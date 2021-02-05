const faker = require("faker");
const createHash = require("../../helpers/helpers.js").createHash;
const db = require("../models/usersModel.js");
exports.seed = async function(knex) {
  let users = [
    {
      firstName: "Christopher",
      lastName: "Harrison",
      password: await createHash("admin", 10),
      email: "cnharrison@gmail.com"
    },
    {
      firstName: "Derek",
      lastName: "Jones",
      password: await createHash("admin", 10),
      email: "thederekjones@gmail.com"
    },
    {
      firstName: "Chris",
      lastName: "Tutor",
      password: await createHash("admin", 10),
      email: "christutor089@gmail.com"
    },
    {
      firstName: "Robert",
      lastName: "Gant",
      password: await createHash("admin", 10),
      email: "gant123@gmail.com"
    }
  ];
  const password = "lambda";

  for (let i = 0; i < 50; i++) {
    let newUser = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: password
    };
    try {
      const hash = await createHash(password, 10);
      newUser.password = hash;
      const userCheck = await db.findByEmail(newUser.email);
      if (userCheck) {
        console.log("email taken--skipping");
      } else {
        users.push(newUser);
      }
    } catch (err) {
      console.log(err);
    }
  }
  return knex("users")
    .del()
    .then(function() {
      return knex("users").insert(users);
    });
};