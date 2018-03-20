'use strict'

const Model = use('Model')

class StudyRoom extends Model {
  static get table() {
    return 'study_rooms';
  }
  static get primaryKey() {
    return 'study_room_id';
  }
}

module.exports = StudyRoom
