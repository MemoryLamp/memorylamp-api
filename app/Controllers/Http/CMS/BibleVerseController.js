'use strict'
const BibleVerses = use("App/Models/BibleVerse");
const Keywords = use("App/Models/Keyword");
const Env = use('Env')
const CustomException = use('App/Exceptions/CustomException');
const BibleVersesServices = use('App/Services/CMS/BibleVerseServices');
const Database = use("Database");

class BibleVerseController {
    constructor() {
        this.bibleVersesServices = new BibleVersesServices();
    }

    async index({ response }) {
        try {
            const bible_verses = await BibleVerses
                .query()
                .with("keywords")
                .fetch();
            
            const { rows } = bible_verses;

            if (rows.length === 0) {
                return response.status(200).json({
                    message: "No bible verse created as of now",
                    data: []
                })
            }

            for (const row of rows) {
                const api_info = {
                    message: "to search user individualy, use api url",
                    type: "GET",
                    url: `${Env.get('APP_URL')}/verses/${row.id}`
                }

                row["dev_remarks"] = api_info;
            }

            response.status(200).json({
                message: "Successfuly retrieved bible verses!",
                data: rows
            })


        } catch (err) {
            const { message } = err;
            throw new CustomException(message, "Internal Server Error", 500);
        }
    }

    async search({ response, params: { id } }) {
        try {
            const rows = await BibleVerses
                .query()
                .where('id', id)
                .with("keywords")
                .fetch();

            const dev_remarks = {
                message: "to retrieve index, use api url",
                type: "GET",
                url: `${Env.get('APP_URL')}/verses`
            }

            if (rows.length === 0) {
                return response.status(200).json({
                    message: "No bible verse found base on the id",
                    id: id,
                    dev_remarks
                })
            }

            response.status(200).json({
                message: "Successfuly searched Bible Verse",
                data: rows,
                dev_remarks
            })


        } catch (err) {
            const { message } = err;
            throw new CustomException(message, "Internal Server Error", 500);
        }
    }

    async create({ request, response }) {
        try {
            const req = request.post();
            const result = await this.bibleVersesServices.createBibleVerse({ info: req });
            
            if (!result) {
                return response.status(500).json({
                    message: "Error on creating bible verses"
                })
            }

            const dev_remarks = {
                message: "to retrieve index, use api url",
                type: "GET",
                url: `${Env.get('APP_URL')}/verses`
            }

            const latest_verse = await BibleVerses.last()

            response.status(201).json({
                message: "Successfuly created user information",
                is_created: result,
                created_verse: latest_verse,
                dev_remarks
            });

        } catch (err) {
            const { message } = err;
            throw new CustomException(message, "Internal Server Error", 500);
        }
    }

    async update({ request, response, params: { id } }) {
        try {
            const req = request.post();

            if (req.hasOwnProperty('keywords')) {
                const { keywords, ...filteredVerseInfo } = req;
                
                for (const keyword of keywords) {
                    const { id, ...filteredkeyword } = keyword;
                    await Database.table('keywords').where('id', id).update(filteredkeyword)
                }

                const result = await this.bibleVersesServices.updateBibleVerseInfo({
                    id: id,
                    req: filteredVerseInfo
                });


                return response.status(200).json({
                    message: "Successfuly updated bible verse information",
                    rows: result
                });
            }
            
            const result = await this.bibleVersesServices.updateBibleVerseInfo({
                id: id,
                req: req
            });

            response.status(200).json({
                message: "Successfuly updated bible verse information",
                rows: result
            });
            

        } catch (err) {
            const { message } = err;
            throw new CustomException(message, "Internal Server Error", 500);
        }
    }

    async delete({ response, params: { id } }) {
        try {

            await Keywords.query().where('verse_id', id).delete()
            await BibleVerses.query().where('id', id).delete()

            response.status(200).json({
                message: "Successfuly deleted bible verse, and all associated keywords",
            })


        } catch (err) {
            const { message } = err;
            throw new CustomException(message, "Internal Server Error", 500);
        }
    }
}

module.exports = BibleVerseController
