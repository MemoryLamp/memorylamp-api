'use strict'

const Model = use('Model')

class UserInfo extends Model {
    static get primaryKey() {
        return 'id';
    }

    static boot() {
        super.boot()

        this.addHook('beforeCreate', 'UserHook.hashPassword');
        this.addHook('beforeCreate', 'UserHook.encryptEmailAddress');
    }

    userProgress() {
        this.hasMany('App/Models/UserProgress', 'id', 'user_id')
    }


}

module.exports = UserInfo
