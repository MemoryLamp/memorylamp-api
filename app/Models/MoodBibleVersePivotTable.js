"use strict";
const Model = use("Model");

class MoodBibleVersePivotTable extends Model {
  mood() {
    return this.hasOne("App/Models/Mood", "mood_id", "id");
  }
}

module.exports = MoodBibleVersePivotTable;
