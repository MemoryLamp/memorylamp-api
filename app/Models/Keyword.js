'use strict'

const Model = use('Model')

class Keyword extends Model {
    static get primaryKey() {
        return 'id';
    }

    bibleVerse() {
        return this.hasOne('App/Models/BibleVerse', 'id', 'verse_id');
    }
}

module.exports = Keyword
