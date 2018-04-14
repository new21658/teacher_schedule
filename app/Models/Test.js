'use strict'

const Model = use('Model')

class Test extends Model {

    static get table() {
        return 'tests'
    }
    static get primaryKey() {
        return 'test_id'
    }

    term() {
        return this.belongsTo('App/Models/Term', 'term_id', 'term_id')
    }
    subject() {
        return this.belongsTo('App/Models/Subject', 'subject_id', 'subject_id')
    }
    group() {
        return this.belongsTo('App/Models/StudentGroup', 'student_group_id', 'student_group_id')
    }
    room() {
        return this.belongsTo('App/Models/StudyRoom', 'study_room_id', 'study_room_id')
    }

}

module.exports = Test
