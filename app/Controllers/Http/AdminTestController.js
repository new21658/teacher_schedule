'use strict'

const { DateTime } = use("luxon")
const DB = use('Database');
const Test = use("App/Models/Test");
const Term = use("App/Models/Term");
const Group = use('App/Models/StudentGroup')
const Room = use('App/Models/StudyRoom')
const Subject = use('App/Models/Subject')
const Teacher = use('App/Models/Teacher')

const { validate } = use("Validator")

const { json_res, json_res_error } = use("App/Utils/Response");

class AdminTestController {
    
    async index({ view }) {
        try{

            const terms = await Term.query()
            .where('status', '=', 'A')
            .orderBy(DB.raw('year(term_year)'), 'DESC')
            .orderBy('term', 'DESC')
            .fetch();
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
        let term = q.term || '';
        let type = q.type || '';

        let tests = await Test.query()
        .with('term')
        .with('subject')
        .with('group')
        .with('room')
        .with('teacher')
        .where('status', 'like', `%${status}%`)
        .where('term_id', 'like', `%${term}%`)
        .where('type', 'like', `%${type}%`)
        .orderBy("date")
        .orderBy("start_time")
        .fetch()

        return json_res(tests);

        } catch(ex) {

            console.error(ex)

            return json_res_error(ex.toString());

        }
    }

    async report({ request, view }) {

      try {

        const q = request.get();

        const term = await Term.find(q.term);

        const tests = await Test.query()
        .where('term_id', '=', q.term)
        .where('type', '=', q.type)
        .where('status', '=', q.status || 'A')
        .with('subject')
        .with('term')
        .with("group")
        .with("room")
        .orderBy('date')
        .orderBy('start_time ')
        .fetch()

        return view.render('report/test', {
          request: request,
          parseInt: parseInt,
          type: q.type,
          term: term.toJSON(),
          tests: JSON.parse(JSON.stringify(tests))
        });

      } catch(ex) {
        return ex.toString();
      }

    }


    async addTest({ request }) {
        try {
          let validation = await validate(request.all(), {
            // ==== keep on tomorow ====
            term: "required",
            subject: "required",
            room: "required",
            //teacher: "required",
            group: "required",
            date: "required",
            start: "required",
            end: "required",
            type: "required",
            range_start: "required",
            range_end: "required"
          });

          if(validation.fails()) {
            var message = validation.messages()[0].message;
            return json_res_error(message);
          }

          let isOverlaps = await Test.isTimeOverlaps(
            request.input("term"), 
            request.input("type"),
            request.input("date"), 
            request.input("start"), 
            request.input("end"), 
            request.input("room")
          );

          if(isOverlaps) {
            return json_res_error("This time has already booked");
          }
    
          var test = new Test();
          test.term_id = request.input("term")
          test.subject_id = request.input("subject")
          test.study_room_id = request.input("room")
          // test.teacher_id = request.input("teacher")
          test.type = request.input("type");
          test.student_group_id = request.input("group")
          test.date = DateTime.fromFormat(request.input("date"), "dd/LL/yyyy").toFormat("yyyy-LL-dd");
          test.start_time = request.input("start")
          test.end_time = request.input("end")
          test.range_start = request.input("range_start")
          test.range_end = request.input("range_end")

          await test.save()
    
          return json_res("Test Added");
    
        } catch(ex) {
          return json_res_error(ex.toString());
          console.log(ex);
        }
      }






      async updateTest({ request }) {
        try {
          let validation = await validate(request.all(), {
            // ==== keep on tomorow ====
            id: "required",
            term: "required",
            subject: "required",
            room: "required",
            teacher: "required",
            group: "required",
            date: "required",
            start: "required",
            end: "required",
            type: "required",
            range_start: "required",
            range_end: "required"
          });

          if(validation.fails()) {
            var message = validation.messages()[0].message;
            return json_res_error(message);
          }
    
          var test = await Test.find(request.input("id"));
          test.term_id = request.input("term")
          test.subject_id = request.input("subject")
          test.study_room_id = request.input("room")
          test.teacher_id = request.input("teacher")
          test.type = request.input("type");
          test.student_group_id = request.input("group")
          test.date = DateTime.fromFormat(request.input("date"), "dd/LL/yyyy").toFormat("yyyy-LL-dd");
          test.start_time = request.input("start")
          test.end_time = request.input("end")
          test.range_start = request.input("range_start")
          test.range_end = request.input("range_end")

          await test.save()
    
          return json_res("Test Added");
    
        } catch(ex) {
          return json_res_error(ex.toString());
          console.log(ex);
        }
      }

      async updateStatus({ request }) {
        try {
          var test = await Test.find(request.input("id"));
    
          test.status = request.input("status");
    
          await test.save();
    
          return json_res("Status updated");
        } catch (ex) {
          return json_res_error(ex.toString());
        }
      }
}

module.exports = AdminTestController
