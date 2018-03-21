'use strict'

let StudentGroup = use('App/Models/StudentGroup');
let { validate } = use('Validator');
let { json_res, json_res_error } = use("App/Utils/Response");

class AdminStudentGroupController {

  async index({ view }) {
      return view.render("admin.student_group");
  }
  async studentGroupAll() {
    try{
        let groups = await StudentGroup.all();
        return json_res(groups);
    } catch(ex) {
        console.log(ex);
        return json_res_error
    }
  }
  async studentGroupSearch({ request }) {
    var search = request.get('search').search;
    try{
        var items = await StudentGroup.query()
        .where(function() {
          this.where('student_group_name', 'like', '%' + search + '%')
          this.orWhere('student_group_count', 'like', search + '%')
        })
        .fetch();
        return json_res(items);
    } catch(ex) {
      console.log(ex);
      return json_res_error(ex.toString());
    }
  }
  async addStudentGroup({ request }) {
    try {
      var validation = await validate(request.all(), {
        'name': 'required',
        'count': 'required'
      });

      if(validation.fails()) {
        var message = validation.messages()[0].message;
        return json_res_error(message);
      }

      var group = new StudentGroup();
      group.student_group_name = request.input('name');
      group.student_group_count = request.input('count');
      await group.save();
      return json_res("Group Added");

    } catch(ex) {
      console.log(ex);
      return json_res_error(ex.toString());
    }
  }
  async updateStudentGroup({ request }) {
    try {
      var validation = await validate(request.all(), {
        'name': 'required',
        'count': 'required'
      });

      if(validation.fails()) {
        var message = validation.messages()[0].message;
        return json_res_error(message);
      }

      var group = await StudentGroup.find(request.input('id'));
      group.student_group_name = request.input('name');
      group.student_group_count = request.input('count');
      await group.save();
      return json_res("Group Updated");

    } catch(ex) {
      console.log(ex);
      return json_res_error(ex.toString());
    }
  }
  async updateStatusStudentGroup({ request }) {
    try {
        var group = await StudentGroup.find(request.input('id'));
        group.status = request.input('status');
        await group.save();
        return json_res("Status updated");
    } catch(ex) {
        return json_res_error(ex.toString());
    }
  }

}

module.exports = AdminStudentGroupController
