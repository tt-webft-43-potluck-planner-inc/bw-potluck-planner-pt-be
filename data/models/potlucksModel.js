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

function insert(potluck) {
  const [id] = db("potlucks").insert(potluck);
  return db("potlucks")
    .where({ id })
    .first();
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
