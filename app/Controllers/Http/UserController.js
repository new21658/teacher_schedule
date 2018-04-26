'use strict'

let { json_res, json_res_error } = use("App/Utils/Response");

class UserController {

    async user_data({ request, auth }) {
        try{
            let user = await auth.getUser();
            return json_res(user);
        } catch(ex) {
            return json_res_error(ex.toString());
        }
    }
}

module.exports = UserController
