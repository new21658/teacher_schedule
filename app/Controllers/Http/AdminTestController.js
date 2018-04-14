'use strict'

const Test = use("App/Models/Test");

const Term = use("App/Models/Term");
const Group = use('App/Models/StudentGroup')
const Room = use('App/Models/StudyRoom')
const Subject = use('App/Models/Subject')
const Teacher = use('App/Models/Teacher')

const { json_res, json_res_error } = use("App/Utils/Response");

class AdminTestController {
    
    async index({ view }) {
        try{

            const terms = await Term.query().where('status', '=', 'A').fetch();
            const groups = await Group.query().where('status', '=', 'A').fetch();
            const rooms = await Room.query().where('status', '=', 'A').fetch();
            const subjects = await Subject.query().where('status', '=', 'A').fetch();
            const teachers = await Teacher.query().whereHas('user', function(qb) {
                qb.where('status', 'A')
            }).fetch();

            return view.render("admin.test", {
                terms: JSON.stringify(terms),
                groups: JSON.stringify(groups),
                rooms: JSON.stringify(rooms),
                subjects: JSON.stringify(subjects),
                teachers: JSON.stringify(teachers)
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
        .with('teacher')
        .where('status', 'like', `%${status}%`)
        .where('term_id', 'like', `%${term}%`)
        .fetch()

        return json_res(tests);

        } catch(ex) {

            console.error(ex)

            return json_res_error(ex.toString());

        }
    }

    async addTest({ request }) {
        try {
          let validation = await validate(request.all(), {
            // ==== keep on tomorow ====
            // year: 'required',
            // term: 'required',
            // start_date: 'required',
            // end_date: 'required'
          });

          if(validation.fails()) {
            var message = validation.message()[0].message;
            return json_res_error(message);
          }
    
          var term = new Term();
          var format = "dd-LL-yyyy";
          term.term_year = DateTime.fromString(request.input('year').trim(), 'yyyy').toSQL();
          term.term = request.input('term').trim();
          term.register_start = DateTime.fromString(request.input('start_date').trim(), format).toSQL();
          term.register_end = DateTime.fromString(request.input('end_date').trim(), format).toSQL();
          await term.save();
    
          return json_res("Term Added");
    
        } catch(ex) {
          return json_res_error(ex.toString());
          console.log(ex);
        }
      }

}

module.exports = AdminTestController
