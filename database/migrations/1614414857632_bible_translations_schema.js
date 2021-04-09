'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BibleTranslationsSchema extends Schema {
  up () {
    this.create('bible_translations', (table) => {
      table.string('id').primary()
      table.string('name')
      table.timestamp('created_at').defaultTo(this.fn.now())
      table.timestamp('updated_at').defaultTo(this.fn.now())
    })
  }

  down () {
    this.drop('bible_translations')
  }
}

module.exports = BibleTranslationsSchema
