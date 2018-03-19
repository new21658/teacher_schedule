'use strict'

class AdminhomeController {

    async index({ view }) {
        return view.render('admin.home');
    }

}

module.exports = AdminhomeController