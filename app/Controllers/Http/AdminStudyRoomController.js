'use strict'

let StudyRoom = use("App/Models/StudyRoom");
let { validate } = use("Validator");
let { json_res, json_res_error } = use("App/Utils/Response");

class AdminStudyViewController {

  async index({ view }) {
    return view.render("admin.study_room");
  }
  async studyRoomAll({ request }) {
    try{

      const q = request.get(),
      status = q.status || '';

      var items = await StudyRoom.query()
      .where('status', 'like', `%${status}%`)
      .fetch()
      return json_res(items);

    } catch(ex) {
      console.log(ex);
      return json_res_error(ex.toString());
    }
  }

  async addStudyRoom({ request }) {
    try {
      var validation = await validate(request.all(), {
        'code': 'required|unique:study_rooms,study_room_id',
        'location': 'required',
        'type' :  'required'
      });

      if(validation.fails()) {
        var message = validation.messages()[0].message;
        if(message.indexOf('unique') == -1) {
          message = "หมายเลขห้องนี้ถูกใช้แล้ว";
        }
        return json_res_error(message);
      }

      var room = new StudyRoom();
      room.study_room_code = request.input('code');
      room.study_room_location = request.input('location');
      room.study_room_type = request.input('type');
      await room.save();
      return json_res("Room Added");

    } catch(ex) {
      console.log(ex);
      return json_res_error(ex.toString());
    }
  }

  async studyRoomSearch({ request }) {
    var search = request.get('search').search;
    try{
        var items = await StudyRoom.query()
        .where(function() {
          this.where('study_room_code', 'like', '%' + search + '%')
          this.orWhere('study_room_location', 'like', '%' + search + '%')
          this.orWhere('study_room_type', 'like', '%' + search + '%')
        })
        .fetch();
        return json_res(items);
    } catch(ex) {
      console.log(ex);
      return json_res_error(ex.toString());
    }
  }

  async updateStudyRoomStatus({ request }) {
    try {
      var room = await StudyRoom.find(request.input('id'));
      room.status = request.input('status');
      await room.save();
      return json_res("Status updated");
    } catch(ex) {
      console.log(ex);
      return json_res_error(ex.toString());
    }
  }

  async updateStudyRoom({ request }) {
    try {
      var validation = await validate(request.all(), {
        'code': 'required|unique:study_rooms,study_room_id',
        'location': 'required',
        'type' :  'required'
      });

      if(validation.fails()) {
        var message = validation.messages()[0].message;
        if(message.indexOf('unique') == -1) {
          message = "หมายเลขห้องนี้ถูกใช้แล้ว";
        }
        return json_res_error(message);
      }

      var room = await StudyRoom.find(request.input('id'));
      room.study_room_code = request.input('code');
      room.study_room_location = request.input('location');
      room.study_room_type = request.input('type');
      await room.save();
      return json_res("Room Updated");

    } catch(ex) {
      console.log(ex);
      return json_res_error(ex.toString());
    }
  }
}

module.exports = AdminStudyViewController
