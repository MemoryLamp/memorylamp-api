'use strict';

const Env = use('Env');
const CustomException = use('App/Exceptions/CustomException');
const BibleTranslationServices = use('App/Services/CMS/BibleTranslationServices');

class BibleTranslationController {
  constructor() {
    this.bibleTranslationServices = new BibleTranslationServices();
  }

  /*
   * Search all bible translations
   */
  async index({ response }) {
    try {
      const translations = await this.bibleTranslationServices.getAllBibleTranslation()

      if (translations.length === 0) {
        return response.status(200).json({
          message: 'No translations found',
          data: [],
        });
      }

      const api_info = {
        message: 'Use api_url to search translations individually',
        type: 'GET',
      };

      for (const row of translations) {
        row['dev_remarks'] = {
          api_url: `${Env.get('APP_URL')}/translations/${row.id}`,
          ...api_info,
        }
      }

      response.status(200).json({
        message: 'Successfully searched Bible Translations',
        data: translations,
      });
    } catch (err) {
      const { message } = err
      throw new CustomException(message, 'Internal Server Error', 500)
    }
  }

  /*
   * Search bible translation by id
   * @params id
   */
  async search({ response, params: { id } }) {
    try {
      const translation = await this.bibleTranslationServices.getBibleTranslationById({ id })

      const dev_remarks = {
        message: 'to retrieve index, use api url',
        api_url: `${Env.get('APP_URL')}/translations`,
        type: 'GET'
      }

      if (!translation) {
        return response.status(200).json({
          message: 'No bible translation found based on id',
          id,
          dev_remarks
        })
      }

      response.status(200).json({
        message: 'Successfully searched bible translation',
        data: translation,
        dev_remarks,
      })
    } catch (err) {
      const { message } = err
      throw new CustomException(message, 'Internal Server Error', 500)
    }
  }

  /*
   * Create new bible translation
   * @params { code, name }
   */
  async create({ request, response }) {
    try {
      const req = request.post()
      const { code } = req
      const translation = await this.bibleTranslationServices.getBibleTranslationById({ id: code })

      if (translation) {
        return response.status(200).json({
          message: 'Bible translation exists',
          code,
        })
      }

      const result = await this.bibleTranslationServices.createBibleTranslation({ info: req })

      if (!result) {
        return response.status(500).json({
          message: 'Error in creating bible translation',
        })
      }

      const bibleTranslation = await this.bibleTranslationServices.getLastRecord()
      const dev_remarks = {
        message: 'to retrieve index, use api url',
        type: 'GET',
        url: `${Env.get('APP_URL')}/translations`
      }

      response.status(200).json({
        message: 'Successfully created bible translation',
        is_created: result,
        data: bibleTranslation,
        dev_remarks,
      })
    } catch (err) {
      const { message } = err
      throw new CustomException(message, 'Internal Server Error', 500)
    }
  }

  /*
   * Update bible translation based on id
   * @params { code, name }
   */
  async update({ request, response, params: { id } }) {
    try {
      const req = request.post()
      const result = await this.bibleTranslationServices.updateBibleTranslation({ id, info: req })

      if (!result) {
        return response.status(500).json({
          message: 'Error in updating bible translation',
        })
      }

      response.status(200).json({
        message: 'Successfully updated bible translation',
        rows: result,
      })
    } catch (err) {
      const { message } = err
      throw new CustomException(message, 'Internal Server Error', 500)
    }
  }

  /*
   * Delete bible translation by id
   */
  async delete({ response, params: { id } }) {
    try {

      const result = await this.bibleTranslationServices.deleteBibleTranslation({ id })

      response.status(200).json({
        message: 'Successfully deleted bible translation',
        rows: result,
      })
    } catch (err) {
      const { message } = err
      throw new CustomException(message, 'Internal Server Error', 500)
    }
  }
}

module.exports = BibleTranslationController;
