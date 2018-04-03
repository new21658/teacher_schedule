'use strict'

const Model = use('Model')
const { DateTime } = use('luxon')

class Course extends Model {
    static get table() {
        return 'courses'
    }
    static get primaryKey() {
        return 'course_id'
    }

    static async byTerm(id) {
        return Course.query()
        .with("subject")
        .with("room")
        .with("teacher")
        .with("term")
        .with("group")
        .where('courses.term_id', '=', id)
        .andWhere("courses.status", "=", "A")
        .fetch();
    }

    getStartTime(time) {
        if(!time) return null
        return DateTime.fromJSDate(time).toFormat('HH:mm')
    }
    getEndTime(time) {
        if(!time) return null
        return DateTime.fromJSDate(time).toFormat('HH:mm')
    }
    subject() {
        return this.belongsTo('App/Models/Subject', 'subject_id', 'subject_id');
    }
    room() {
        return this.belongsTo('App/Models/StudyRoom', 'study_room_id', 'study_room_id')
    }
    teacher() {
        return this.belongsTo('App/Models/Teacher', 'teacher_id', 'teacher_id');
    }
    term() {
        return this.belongsTo('App/Models/Term', 'term_id', 'term_id');
    }
    group() {
        return this.belongsTo('App/Models/StudentGroup', 'student_group_id', 'student_group_id');
    }

}

module.exports = Course
