const db = require("../knexConfig.js");

module.exports = {
  insert,
  update,
  remove,
  getAll,
  findById,
  findByEmail
};

async function remove(id) {
  return await db("users")
    .where("id", Number(id))
    .del();
}

async function getAll() {
  return await db("users");
}

async function findById(id) {
  return await db("users")
    .where({ id: Number(id) })
    .first();
}

async function findByEmail(email) {
  return await db("users")
    .where({ email })
    .first();
}

async function insert(record) {
  const [id] = await db("users").insert(record);
  return db("users")
    .where({ id })
    .first();
}

async function update(id, record) {
  return await db("users")
    .where("id", Number(id))
    .update(record);
}
