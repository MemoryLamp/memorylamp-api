'use strict'
const Hash = use('Hash');
const Encryption = use('Encryption');


const UserHook = exports = module.exports = {}

UserHook.hashPassword = async (user) => {
    user.password = await Hash.make(user.password)
}

UserHook.encryptEmailAddress = async (user) => {
    user.email_address = Encryption.encrypt(user.email_address);
}