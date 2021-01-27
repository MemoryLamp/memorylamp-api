'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class RequiredParameterException extends LogicalException {
  /**
   * Handle this exception by itself
   */
  // handle () {}
  handle(error, { response }) {
    response.status(422).json({
      message: "Missing Required Parameters",
      error: `${error.message} is missing on the request fields`
    })
  }
}

module.exports = RequiredParameterException
