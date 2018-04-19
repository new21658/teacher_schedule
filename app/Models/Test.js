'use strict'

const Model = use('Model')
const DB = use("Database")
const { DateTime } = use("luxon")

class Test extends Model {

    static get table() {
        return 'tests'
    }
    static get primaryKey() {
        return 'test_id'
    }

    // helpers
    static async isTimeOverlaps(term, type, date, start, end, room) {
        
        let exists = await Test.query()
        .where("tests.term_id", "=", term)
        .where("tests.study_room_id", "=", room)
        .where("tests.type", '=', type)
        .where("tests.date", '=', DateTime.fromFormat(date, "dd/LL/yyyy").toFormat("yyyy-LL-dd"))
        .where(function() {
            this.where(DB.raw("time(date_format(tests.start_time, '%H:%m')) between ? and ?", [start, end]))
            this.orWhere(DB.raw("time(date_format(tests.end_time, '%H:%m')) between ? and ?", [start, end]))
        }).first();

        return exists != null;

    } 

    getDate(date) {
        return DateTime.fromJSDate(date).toFormat("dd/LL/yyyy");
    }

    getStartTime(time) {
        return this.formatTime(time)
    }

    getEndTime(time) {
        return this.formatTime(time)
    }

    formatTime(time) {
        return DateTime.fromFormat(time, "HH:mm:ss").toFormat("HH:mm");
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
    teacher() {
        return this.belongsTo('App/Models/Teacher', 'teacher_id', 'teacher_id')
    }

}

module.exports = Test
