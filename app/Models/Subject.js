'use strict'

const Model = use('Model')

class Subject extends Model {
    static get table() {
        return 'subjects'
    }
    static get primaryKey() {
        return 'subject_id'
    }
}

module.exports = Subject