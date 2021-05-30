"use strict";
const MoodBibleVersePivotTable = use("App/Models/MoodBibleVersePivotTable");

class MoodBibleVersePivotServices {
  async createMoodBibleVersePivotData({ data }) {
    const { mood_id, bible_verse_id } = data;
    const moodBibleVersePivotTable = new MoodBibleVersePivotTable();

    moodBibleVersePivotTable.mood_id = mood_id;
    moodBibleVersePivotTable.bible_verse_id = bible_verse_id;

    return await moodBibleVersePivotTable.save();
  }
}

module.exports = MoodBibleVersePivotServices;
