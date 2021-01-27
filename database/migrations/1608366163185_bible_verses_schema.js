'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BibleVersesSchema extends Schema {
  up () {
    this.create('bible_verses', (table) => {
      table.increments('id').primary()
      table.string('book')
      table.string('chapter')
      table.string('verse_no')
      table.string('details')
      table.timestamp('created_at').defaultTo(this.fn.now())
      table.timestamp('updated_at').defaultTo(this.fn.now())
    })
  }

  down () {
    this.drop('bible_verses')
  }
}

module.exports = BibleVersesSchema
