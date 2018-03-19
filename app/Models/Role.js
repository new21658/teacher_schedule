'use strict'

const Model = use('Model')

class Role extends Model {
    static get table() {
        return 'roles'
    }
    static get primaryKey() {
        return 'role_id';
    }
}

module.exports = Role