'use strict'
const User = use('App/Models/UserInfo');
const Env = use('Env')
const CustomException = use('App/Exceptions/CustomException');
const UserService = use("App/Services/Admin/UserServices");
const Database = use('Database');

class UserController {
    constructor() {
        this.userServices = new UserService();
    }
    
    async index({ response }) {
        try {               
            const users = await User
                .query()
                .where('is_active', true)
                .fetch();
            
            const { rows } = users;
            
            if (rows.length === 0) {
                return response.status(200).json({
                    message: "No user registered as of now",
                    data: []
                })
            }

            for (const row of rows) {
                const api_info = {
                    message: "to search user individualy, use api url",
                    type: "GET",
                    url: `${Env.get('APP_URL')}/users/${row.id}`
                }

                row["dev_remarks"] = api_info;
            }

            response.status(200).json({
                message: "Successfuly retrieved user information!",
                data: rows
            })

        } catch (err) {
            const { message } = err;
            throw new CustomException(message, "Internal Server Error", 500);
        }
    }

    async search({ response, params: { id } }) {
        try {
            const rows = await User.find(id);

            const dev_remarks = {
                message: "to retrieve index, use api url",
                type: "GET",
                url: `${Env.get('APP_URL')}/users`
            }

            if (rows.legth === 0) {
                return response.status(200).json({
                    message: "No user found, based on the id used",
                    id: id,
                    dev_remarks
                })
            }

            response.status(200).json({
                message: "Successfuly searched user",
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
            const result = await this.userServices.createUser({ info: req });

            if (!result) {
                return response.status(500).json({
                    message: "Error on creating user"
                })
            }

            const dev_remarks = {
                message: "to retrieve index, use api url",
                type: "GET",
                url: `${Env.get('APP_URL')}/users`
            }

            const latest_user = await User.last()

            response.status(201).json({
                message: "Successfuly created user information",
                is_created: result,
                created_user: latest_user,
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
            const affectedRows = await Database.table('user_infos')
                .where('id', id)
                .update(req);

            response.status(200).json({
                message: "Successfuly updated user information",
                rows: affectedRows
            })

        } catch (err) {
            const { message, status, code } = err;
            throw new CustomException(message, status, code);
        }
    }

    async archive({ response, params: { id, status } }) {
        try {

            const affectedRows = await Database.table('user_infos')
                .where('id', id)
                .update('is_active', status === "false" ? 0 : 1);
            
            response.status(200).json({
                message: "Successfuly updated user active state",
                rows: affectedRows
            })

        } catch (err) {
            const { message, status, code } = err;
            throw new CustomException(message, status, code);
        }
    }
}

module.exports = UserController
