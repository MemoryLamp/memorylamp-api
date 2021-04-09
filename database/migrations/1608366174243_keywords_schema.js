'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class KeywordsSchema extends Schema {
  up () {
    this.create('keywords', (table) => {
      table.increments('id').primary()
      table.integer('verse_id').unsigned().references('bible_verses.id')
      table.string('keyword')
      table.integer('step_no')
      table.timestamps()
    })
  }

  down () {
    this.drop('keywords')
  }
}

module.exports = KeywordsSchema
