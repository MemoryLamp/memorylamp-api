const User = use('App/Models/UserInfo');


class UserServices {
    async createUser({ info }) {
        const {
            firstname,
            middlename,
            lastname,
            suffix,
            def_translation,
            verses_notification_count,
            email_address,
            password
        } = info;
        
        const user = new User();

        user.firstname = firstname
        user.middlename = middlename
        user.lastname = lastname
        user.suffix = suffix
        user.def_translation = def_translation
        user.verses_notification_count = verses_notification_count
        user.email_address = email_address
        user.is_active = true;
        user.password = password

        return await user.save();
    }

    
}

module.exports = UserServices;