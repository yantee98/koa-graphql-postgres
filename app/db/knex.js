const config = require("../config");
const knex = require("knex")(config.db);

var pg = require("pg");
pg.types.setTypeParser(20, "text", parseInt);

module.exports = knex;
