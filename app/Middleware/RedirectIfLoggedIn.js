'use strict'

class RedirectIfLoggedIn {
  async handle ({ request, auth, response }, next) {
    // call next to advance the request
    try{
      await auth.check();
      var user = await auth.getUser();
      console.log("RedirectIfLoggin:User LoggedIn");
      if(user.role_id == 2) {
        response.redirect('/admin');
      } else {
        response.redirect('/');
      }
      await next();
    } catch(ex) {
      console.log("RedirectIfLoggin:User not loggedIn");
      await next();
    }

  }
}

module.exports = RedirectIfLoggedIn
