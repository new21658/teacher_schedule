'use strict'

const Model = use('Model')

class Teacher extends Model {
    static get table() {
        return 'teachers';
    }
    static get primaryKey() {
        return 'teacher_id';
    }
}

module.exports = Teacher