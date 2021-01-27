'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class UserProgress extends Model {
    static get primaryKey() {
        return 'id';
    }

    user() {
        this.hasOne('App/Models/UserInfo', 'id', 'user_id');
    }
}

module.exports = UserProgress
