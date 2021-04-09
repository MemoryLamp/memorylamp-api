'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserInfoSchema extends Schema {
  up () {
    this.create('user_infos', (table) => {
      table.increments('id').primary()
      table.string('firstname')
      table.string('middlename')
      table.string('lastname')
      table.string('suffix')
      table.string('def_translation')
      table.integer('verses_notification_count')
      table.string('email_address')
      table.string('password')
      table.boolean('is_active')
      table.timestamp('created_at').defaultTo(this.fn.now())
      table.timestamp('updated_at').defaultTo(this.fn.now())
    })
  }

  down () {
    this.drop('user_infos')
  }
}

module.exports = UserInfoSchema
