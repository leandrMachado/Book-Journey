exports.up = function (knex) {
  return knex.schema.createTable("users", (t) => {
    t.increments("id").primary();
    t.string("email").notNullable().unique();
    t.string("username").notNullable();
    t.specificType("user_progress", "text[]").defaultTo(
      knex.raw("ARRAY[]::text[]")
    );
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
