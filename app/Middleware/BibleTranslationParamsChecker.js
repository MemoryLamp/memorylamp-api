'use strict'
const RequiredParameterException = use('App/Exceptions/RequiredParameterException')

class BibleTranslationParamsChecker {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ request }, next) {
    const { code, name } = request.post()

    if (this.isValueEmpty(name)) {
      throw new RequiredParameterException('name')
    }

    // call next to advance the request
    await next()
  }

  isValueEmpty(data) {
    return !data || data === "" || data === null;
  }
}

module.exports = BibleTranslationParamsChecker
