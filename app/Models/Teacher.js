'use strict'

const Model = use('Model')

class Teacher extends Model {
    static get table() {
        return 'teachers';
    }
    static get primaryKey() {
        return 'teacher_id';
    }
    user() {
        return this.belongsTo('App/Models/User', 'user_id', 'user_id')
    }
} 

module.exports = Teacher