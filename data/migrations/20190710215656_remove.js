exports.up = async function(knex) {
  await knex.schema.table("users", tbl => {
    tbl.dropColumn("userId");
  });
};

exports.down = async function(knex) {
  await knex.schema.createTable("users", tbl => {
    tbl.increments("id");
    tbl
      .integer("userId")
      //   .onDelete("CASCADE")
      //   .onUpdate("CASCADE")
      .unique()
      .notNullable();
  });
};
