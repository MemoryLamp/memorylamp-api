const BibleVerses = use("App/Models/BibleVerse");
const Keyword = use("App/Models/Keyword");
const Database = use("Database");

class BibleVerseServices {
    async createBibleVerse({ info }) {
        const { book, chapter, verse_no, details, keywords, translation_id } = info;

        const bverses = new BibleVerses();

        bverses.book = book;
        bverses.chapter = chapter;
        bverses.verse_no = verse_no;
        bverses.details = details;
        bverses.translation_id = translation_id;

        const result = await bverses.save();
        const last_row = await BibleVerses.last();

        for (const keyword of keywords) {
            await this.createKeywords({
                id: last_row.id,
                keywords: keyword
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
        const data = {
            updated_at: Database.fn.now(),
            ...req,
        }
        const affectedRows = await Database.table('bible_verses')
            .where('id', id)
            .update(data);

        return affectedRows;
    }
}

module.exports = BibleVerseServices;
