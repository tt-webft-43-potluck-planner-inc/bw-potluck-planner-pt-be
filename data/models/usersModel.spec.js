const db = require("../knexConfig.js");
const Users = require("./usersModel.js");

describe("users model", () => {
  describe("insert", () => {
    afterEach(async () => {
      await db("users").truncate();
    });
    it("should insert a user into the database", async () => {
      await Users.insert({
        firstName: "Skitty",
        lastName: "Mcgee",
        email: "skittym69@gmail.com",
        hash: "asdlfkjaslp;dfjsimahsahloool"
      });

      const users = await db("users");

      expect(users).toHaveLength(1);
      expect(users[0].firstName).toBe("Skitty");
    });

    it("should return the new user on insert", async () => {
      const users = await Users.insert({
        firstName: "Skitty",
        lastName: "Mcgee",
        email: "skittym69@gmail.com",
        hash: "asdlfkjaslp;dfjsimahsahloool"
      });
      expect(users).toEqual({
        id: 1,
        firstName: "Skitty",
        lastName: "Mcgee",
        email: "skittym69@gmail.com",
        hash: "asdlfkjaslp;dfjsimahsahloool"
      });
    });
  });
});
