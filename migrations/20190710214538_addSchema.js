exports.up = async function(knex) {
  await knex.schema.dropTableIfExists("potluck_planner");
  await knex.schema.createTable("users", tbl => {
    tbl.increments("id");
    tbl
      .integer("userId")
      //   .onDelete("CASCADE")
      //   .onUpdate("CASCADE")
      .unique()
      .notNullable();
    tbl.string("firstName").notNullable();
    tbl.string("lasttName").notNullable();
    tbl
      .string("email")
      .unique()
      .notNullable();
    tbl
      .string("hash")
      .unique()
      .notNullable();
  });

  await knex.schema.createTable("usersPotlucks", tbl => {
    tbl.increments("id");
    tbl.integer("userId").notNullable();
    tbl
      .foreign("userId")
      .references("id")
      .inTable("users");
    tbl.integer("potluckId").notNullable();
    tbl
      .foreign("potluckId")
      .references("id")
      .inTable("potlucks");
    tbl.integer("role").notNullable();
    tbl.integer("attendance");
  });
  await knex.schema.createTable("potlucks", tbl => {
    tbl.increments("id");
    tbl.string("locationName").notNullable();
    tbl.string("locationAddress").notNullable();
  });
  await knex.schema.createTable("potluckItems", tbl => {
    tbl.increments("id");
    tbl.integer("potluckItemsUserId").notNullable();
    tbl
      .foreign("potluckItemsUserId")
      .references("id")
      .inTable("users");
    tbl.integer("potluckItemsPotluckId").notNullable();
    tbl
      .foreign("potluckItemsPotluckId")
      .references("id")
      .inTable("potlucks");
    tbl.string("foodName").notNullable();
    tbl.integer("servings").notNullable();
  });
  await knex.schema.createTable("potluckRequirements", tbl => {
    tbl.increments("id");
    tbl.integer("potluckrequirementsId").notNullable();
    tbl
      .foreign("potluckrequirementsId")
      .references("id")
      .inTable("potlucks");
    tbl.string("foodType").notNullable();
    tbl.integer("servings").notNullable();
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists("users");
  await knex.schema.dropTableIfExists("usersPotlucks");
  await knex.schema.dropTableIfExists("potlucks");
  await knex.schema.dropTableIfExists("potluckItems");
  await knex.schema.dropTableIfExists("potluckRequirements");

  await knex.schema.createTable("potluck_planner", tbl => {
    tbl.increments();
    tbl
      .string("name", 128)
      .notNullable()
      .unique();
  });
};
