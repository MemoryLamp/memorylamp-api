const BibleTranslation = use('App/Models/BibleTranslation')

class BibleTranslationServices {
  async getAllBibleTranslation() {
    const translations = await BibleTranslation.query().fetch()
    const { rows } = translations
    return rows
  }

  async getBibleTranslationById({ id }) {
    const translation = await BibleTranslation.find(id)
    return translation
  }

  async createBibleTranslation({ info }) {
    const translation = this.createModelObject(info)
    const result = await translation.save()
    return result
  }

  async updateBibleTranslation({ id, info }) {
    const translation = this.createModelObject(info)
    const result = await BibleTranslation.query().where('id', id).update(translation)
    return result
  }

  async deleteBibleTranslation({ id }) {
    const result = await BibleTranslation.query().where('id', id).delete()
    return result
  }

  async getLastRecord() {
    const translation = await BibleTranslation.last()
    return translation
  }

  createModelObject(info) {
    const { code, name } = info
    const translation = new BibleTranslation()

    translation.id = code
    translation.name = name

    return translation
  }
}

module.exports = BibleTranslationServices
