'use strict'

const Model = use('Model')

class StudentGroup extends Model {
  static get table() { return 'student_groups' }
  static get primaryKey() { return 'student_group_id' }

}

module.exports = StudentGroup
