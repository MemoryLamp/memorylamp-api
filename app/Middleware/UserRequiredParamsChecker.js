'use strict'
const RequiredParameterException = use('App/Exceptions/RequiredParameterException')

class UserRequiredParamsChecker {
  async handle({ request }, next) {
    const { firstname, middlename, lastname, email_address, password } = request.post();

    if (firstname === "" || firstname === null) {

      throw new RequiredParameterException("Firstname");

    } else if (middlename === "" || middlename === null) {

      throw new RequiredParameterException("Middlename");

    } else if (lastname === "" || lastname === null) {
      
      throw new RequiredParameterException("Lastname");

    } else if (email_address === "" || email_address === null) {
      
      throw new RequiredParameterException("Email Address");

    } else if (password === "" || password === null) {
      
      throw new RequiredParameterException("Password");
    }
    
    await next()
  }
}

module.exports = UserRequiredParamsChecker
