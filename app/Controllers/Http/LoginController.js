'use strict'

var { json_res, json_res_error } = use("App/Utils/Response");

class LoginController {

    index({ request, view }) {
        return view.render('sign');
    }

    async login(ctx) {
        var { request, auth } = ctx;
        var username = request.input('username');
        var password = request.input('password');
        try {
            await auth.attempt(username, password);
            return json_res("success");
        } catch (ex) {
            return json_res_error(ex.toString());
        }

    }
    redirectTo(auth) {

    }

}

module.exports = LoginController