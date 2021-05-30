"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class MoodSchema extends Schema {
  up() {
    this.create("moods", (table) => {
      table.integer("id").primary();
      table.string("name");
      table.string("description");
      table.timestamps();
    });
  }

  down() {
    this.drop("moods");
  }
}

module.exports = MoodSchema;
