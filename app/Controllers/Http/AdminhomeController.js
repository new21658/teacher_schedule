'use strict'

const Course = use('App/Models/Course')
const DB = use('Database')

class AdminhomeController {

    async index({ view }) {

        let not_responsed = await DB.raw("select count(*) as not_responsed from courses as c where c.teacher_responsed = 0 and c.status = 'A'");
        let not_approved = await DB.raw("select count(*) as not_approved from courses as c where c.approved = 0 and c.status = 'A'")

        return view.render('admin.home', {
            JSON: JSON,
            not_responsed: not_responsed[0],
            not_approved: not_approved[0]
        });
    }

}

module.exports = AdminhomeController