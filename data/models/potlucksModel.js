const db = require("../knexConfig.js");

module.exports = {
  getAll,
  findById,
  insert,
  update,
  remove
};

async function getAll() {
  return await db("potlucks");
}

async function findById(id) {
  return await db("potlucks")
    .where({ id: Number(id) })
    .first();
}

async function insert(potluck) {
  const [id] = await db("potlucks").insert(potluck);
  return db("potlucks")
    .where({ id })
}

async function update(id, potluck) {
  return await db("potlucks")
    .where("id", Number(id))
    .update(potluck);
}

async function remove(id) {
  return await db("potlucks")
    .where("id", Number(id))
    .del();
}
