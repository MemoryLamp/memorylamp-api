'use strict'
const Database = use('Database');
const Encryption = use('Encryption');

class CheckExistingUser {
  async handle({ request, response }, next) {
    const { email_address } = request.post();

    const rows = await Database.select('email_address').from('user_infos');

    for (const row of rows) {
      const decryptedEmail = Encryption.decrypt(row.email_address);

      if (decryptedEmail === email_address) {
        return response.status(422).json({
          message: "User already registered, kindly use different email address"
        })
      }
    }

    // call next to advance the request
    await next()
  }
}

module.exports = CheckExistingUser
