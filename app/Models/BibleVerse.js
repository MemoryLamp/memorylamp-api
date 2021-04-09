'use strict'

const Model = use('Model')

class BibleVerse extends Model {
    static get primaryKey() {
        return 'id';    
    }
    
    keywords() {
        return this.hasMany('App/Models/Keyword', 'id', 'verse_id');
    }
}

module.exports = BibleVerse
