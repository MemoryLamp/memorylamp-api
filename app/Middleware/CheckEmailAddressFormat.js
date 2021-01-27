'use strict'
class CheckEmailAddressFormat {
  async handle ({ request, response }, next) {
    const { email_address } = request.post();

    var re = /\S+@\S+\.\S+/;
    const isValidEmailFormat = re.test(email_address) ? true : false;
    
    if (!isValidEmailFormat) {
      return response.status(422).json({
        message: "Invalid format of email address",
        email: email_address
      })
    }

    await next()
  }
}

module.exports = CheckEmailAddressFormat
