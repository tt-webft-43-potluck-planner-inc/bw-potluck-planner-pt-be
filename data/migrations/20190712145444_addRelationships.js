exports.up = async function(knex) {

    await knex.schema.table("usersPotlucks", tbl => {
      tbl
        .foreign("potluckId")
        .references("id")
        .inTable("potlucks");        
    });
  
    await knex.schema.table("potluckItems", tbl => {
      tbl
        .foreign("potluckItemsUserId")
        .references("id")
        .inTable("users");
      tbl
        .foreign("potluckItemsPotluckId")
        .references("id")
        .inTable("potlucks");
    });
    await knex.schema.table("potluckRequirements", tbl => {
      tbl
        .foreign("potluckrequirementsId")
        .references("id")
        .inTable("potlucks");
    });

  
  exports.down = async function(knex) {
      await knex.schema.table("usersPotlucks", tbl => {
          tbl
            .dropForeign("potluckId")
            .references("id")
            .inTable("potlucks");
        });
      
        await knex.schema.table("potluckItems", tbl => {
          tbl
            .dropForeign("potluckItemsUserId")
            .references("id")
            .inTable("users");
          tbl
            .dropForeign("potluckItemsPotluckId")
            .references("id")
            .inTable("potlucks");
        });
        await knex.schema.table("potluckRequirements", tbl => {
          tbl
            .dropForeign("potluckrequirementsId")
            .references("id")
            .inTable("potlucks");
        });
      }

    };