'use strict'

var { json_res, json_res_error } = use("App/Utils/Response");
var User = use("App/Models/User");

class LoginController {

    index({ request, view, response }) {
        return view.render('sign');
    }

    async login(ctx) {
        var { request, auth } = ctx;
        var username = request.input('username').trim();
        var password = request.input('password').trim();
        // return json_res_error(password);
        var self = this;
        try {
            // check if user is activated
            await User.isActivate(username);
            await auth.attempt(username, password);
            var redirect_to = await self.redirectTo(auth);
            return json_res({
              redirect_to: redirect_to
            });
        } catch (ex) {
            return json_res_error(ex.toString());
        }

    }

    async logout({ auth, response }) {
      try{
        await auth.logout();
        response.redirect('/');
      } catch(ex) {
        response.redirect('/');
      }


    }

    async redirectTo(auth) {
      var user = await auth.getUser();
       return auth.getUser().role_id == 1 ? '/' : '/admin';
    }

}

module.exports = LoginController
