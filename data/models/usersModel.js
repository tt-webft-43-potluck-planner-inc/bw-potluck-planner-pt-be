const db = require("../knexConfig.js");

module.exports = {
  insert,
  update,
  remove,
  getAll,
  findById
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

async function insert(record) {
  return await db("users")
    .insert(record)
    .then(ids => ({ id: ids[0] }));
}

async function update(id, record) {
  return await db("users")
    .where("id", Number(id))
    .update(record);
}
