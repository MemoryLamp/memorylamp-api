"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class MoodBibleVersePivotSchema extends Schema {
  up() {
    this.create("mood_bible_verse_pivots", (table) => {
      table.increments();
      table.integer("mood_id");
      table.integer("bible_verse_id");
      table.timestamp("created_at").defaultTo(this.fn.now());
      table.timestamp("updated_at").defaultTo(this.fn.now());
    });
  }

  down() {
    this.drop("mood_bible_verse_pivots");
  }
}

module.exports = MoodBibleVersePivotSchema;
