exports.up = async function(knex) {
  await knex.schema.table("users", tbl => {
    tbl.dropColumn("lasttName");
    tbl.string("lastName");
  });
};

exports.down = async function(knex) {
  await knex.schema.createTable("users", tbl => {
    tbl.string("lasttName").notNullable();
    tbl.dropColumn("lastName");
  });
};
