'use strict'

const DB = use('Database')
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

    static async thisTimeIsAvailable(term, teacher, subject, room, start, end) {
        return ( await Course.query()
        .where('courses.term_id', '=', term)
        .where('courses.teacher_id', '=', teacher)
        .where('courses.subject_id', '=', subject)
        .where('courses.study_room_id', '=', room)
        .where(function() {
            this.where(DB.raw("date_format(courses.start_time, '%H:%i') BETWEEN ? AND ?", [start, end]))
            this.orWhere(DB.raw("date_format(courses.end_time, '%H:%i') BETWEEN ? AND ?", [start, end]))
        }).first()
        ) == null
    }

    getStartTime(time) {
        if(!time) return null
        return DateTime.fromFormat(time, "HH:mm:ss").toFormat('HH:mm')
    }
    getEndTime(time) {
        if(!time) return null
        return DateTime.fromFormat(time, "HH:mm:ss").toFormat('HH:mm')
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
