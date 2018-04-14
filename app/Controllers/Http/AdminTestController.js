'use strict'

const Test = use("App/Models/Test");
const Term = use("App/Models/Term");
const { json_res, json_res_error } = use("App/Utils/Response");

class AdminTestController {
    
    async index({ view }) {
        try{
            const terms = await Term.query().where('status', '=', 'A').fetch();

            return view.render("admin.test", {
                terms: JSON.stringify(terms)
            });


        } catch(ex) {
            return ex.toString()
        }
    }

    async testAll({ request }) {
        
        try{

        const q = request.get()

        let status = q.status || '';
        let term = q.term || ''

        let tests = await Test.query()
        .with('term')
        .with('subject')
        .with('group')
        .with('room')
        .where('status', 'like', `%${status}%`)
        .where('term_id', 'like', `%${term}%`)
        .fetch()

        return json_res(tests);

        } catch(ex) {

            console.error(ex)

            return json_res_error(ex.toString());

        }

        
    }

}

module.exports = AdminTestController
