const BibleVerses = use("App/Models/BibleVerse");
const MoodBibleVersePivotServices = use(
  "App/Services/CMS/MoodBibleVersePivotServices"
);
const Keyword = use("App/Models/Keyword");
const Database = use("Database");

class BibleVerseServices {
  constructor() {
    this.moodBibleVersePivotServices = new MoodBibleVersePivotServices();
  }
  async createBibleVerse({ info }) {
    const { book, chapter, verse_no, details, keywords, moods } = info;

    const bverses = new BibleVerses();

    bverses.book = book;
    bverses.chapter = chapter;
    bverses.verse_no = verse_no;
    bverses.details = details;

    const result = await bverses.save();
    const last_row = await BibleVerses.last();

    for (const keyword of keywords) {
      await this.createKeywords({
        id: last_row.id,
        keywords: keyword,
      });
    }

    for (const mood of moods) {
      const _pivot_data = {
        mood_id: mood.id,
        bible_verse_id: last_row.id,
      };

      await this.moodBibleVersePivotServices.createMoodBibleVersePivotData({
        data: _pivot_data,
      });
    }

    return result;
  }

  async createKeywords({ id, keywords }) {
    const { keyword, step_no } = keywords;

    const kword = new Keyword();

    kword.verse_id = id;
    kword.keyword = keyword;
    kword.step_no = step_no;

    return await kword.save();
  }

  async updateBibleVerseInfo({ id, req }) {
    const affectedRows = await Database.table("bible_verses")
      .where("id", id)
      .update(req);

    return affectedRows;
  }
}

module.exports = BibleVerseServices;
