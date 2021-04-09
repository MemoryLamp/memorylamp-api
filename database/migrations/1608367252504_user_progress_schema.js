'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserProgressSchema extends Schema {
  up () {
    this.create('user_progresses', (table) => {
      table.increments('id').primary()
      table.integer("user_id").unsigned().references("user_infos.id")
      table.integer('verse_id').unsigned().references("bible_verses.id")
      table.string('mastery_level')
      table.timestamp('created_at').defaultTo(this.fn.now())
      table.timestamp('updated_at').defaultTo(this.fn.now())
    })
  }

  down () {
    this.drop('user_progresses')
  }
}

module.exports = UserProgressSchema
