exports.up = function (knex) {
  return knex.schema.createTable("session", function (table) {
    table.string("sid").primary().notNullable();
    table.json("sess").notNullable();
    table.timestamp("expire", { useTz: true }).notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("session");
};
