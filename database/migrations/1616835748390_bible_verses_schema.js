'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BibleVersesSchema extends Schema {
  up () {
    this.table('bible_verses', (table) => {
      table.string('translation_id').after('details')
      table.foreign('translation_id').references('bible_translations.id')
    })
  }

  down () {
    this.table('bible_verses', (table) => {
      table.dropColumn('translation_id')
    })
  }
}

module.exports = BibleVersesSchema
