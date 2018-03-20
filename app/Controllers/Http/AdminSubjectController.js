'use strict'

var Subject = use("App/Models/Subject");
var { json_res, json_res_error } = use("App/Utils/Response");
var { validate } = use('Validator');

class AdminSubjectController {
  async index({ view }) {
      return view.render('admin.subject');
  }
  async subjectAll() {
      try {

        let subjects = await Subject.all();
        return json_res(subjects);

      } catch(ex) {
        return json_res_error(ex);
      }
  }

  async addSubject({ request }) {

    try{

      var validation = await validate(request.all(), {
          name: 'required',
          code: 'required|unique:subjects,subject_code'
      });

      if(validation.fails()) {
          var message = validation.messages()[0].message;
          if(message.indexOf("unique") != -1) {
            message = "รหัสวิชานี้ถูกใช้แล้ว";
          }
          return json_res_error(message);
      }

      var subject = new Subject();
      subject.subject_name = request.input('name');
      subject.subject_code = request.input('code');
      await subject.save();

    } catch(ex) {
      console.log(ex);
      return json_res_error(ex.toString());
    }
  }

  async subjectSearch({ request }) {
    var search = request.get('search').search;
    try{
        var items = await Subject.query()
        .where(function() {
          this.where('subjects.subject_name', 'like', '%' + search + '%')
          this.orWhere('subject_code', 'like', '%' + search + '%')
        })
        .fetch();
        return json_res(items);
    } catch(ex) {
      console.log(ex);
      return json_res_error(ex.toString());
    }
  }

  async updateSubject({ request }) {
    try {
      var validation = await validate(request.all(), {
        name: 'required',
        code: 'required|unique:subjects,subject_code'
      });
      if(validation.fails()) {
        var message = validation.messages()[0].message;
        if(message.indexOf("unique") != -1) {
          message = "รหัสวิชานี้ถูกใช้แล้ว";
        }
        return json_res_error(message);
      }
      let subject = await Subject.find(request.input('id'));
      subject.subject_name = request.input('name');
      subject.subject_code = request.input('code');
      await subject.save();
      return json_res("Subject Updated");
    } catch(ex) {
      console.log(ex);
      return json_res_error(ex.toString());
    }
  }

  async updateStatus({ request }) {
      try {
          var subject = await Subject.find(request.input('id'));
          subject.status = request.input('status');
          await subject.save();
          return json_res("Status updated");
      } catch(ex) {
          return json_res_error(ex.toString());
      }
  }

}

module.exports = AdminSubjectController
