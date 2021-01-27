'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class CustomException extends LogicalException {
  
  /**
   * 
   * handles custom exception
   * send error received from the controller
   * 
   */

  handle(error, { response }) {
    response.status(500).json({
      message: "Custom Exception Handled!",
      error: error.message
    })
  }
}

module.exports = CustomException
