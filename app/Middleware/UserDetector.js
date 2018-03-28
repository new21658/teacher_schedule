'use strict'

var Route = use('Route');

class UserDetector {
  async handle ({ request, response, auth }, next) {
    // call next to advance the request
    try{
      await auth.check();
      var user = await auth.getUser();
      console.log("UserDetector:user loggedIn");
      if(user.role_id != 1) {
        return response.redirect("/admin");
      } else {
        await next();
      }

    } catch(ex) {
      response.route('login_page');
      // await next();
    }
  }
}

module.exports = UserDetector
