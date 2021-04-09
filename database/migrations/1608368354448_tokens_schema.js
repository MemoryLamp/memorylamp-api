'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TokensSchema extends Schema {
  up () {
    this.create('tokens', (table) => {
      table.increments('id').primary()
      table.integer('user_id').unsigned().references('user_infos.id')
      table.string('token')
      table.string('type')
      table.boolean('is_revoked')
      table.timestamp('created_at').defaultTo(this.fn.now())
      table.timestamp('updated_at').defaultTo(this.fn.now())
    })
  }

  down () {
    this.drop('tokens')
  }
}

module.exports = TokensSchema
