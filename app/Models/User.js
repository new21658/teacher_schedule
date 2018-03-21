'use strict'

const Model = use('Model')

class User extends Model {

    static get table() {
        return 'users';
    }
    static get primaryKey() {
        return 'user_id';
    }

    teacher() {
        return this.hasOne('App/Models/Teacher', 'user_id', 'user_id');
    }

    role() {
        return this.belongsTo('App/Models/Role', 'role_id', 'role_id');
    }

    static async isActivate(username) {
        let user = await User.query().where(function() {
          this.where('username', '=', username);
          this.andWhere('status', '=', 'A');
        }).first();
        if(!user) throw new Exception("This user not activated");
        return true;
    };

    static boot() {
        super.boot()

        /**
         * A hook to hash the user password before saving
         * it to the database.
         *
         * Look at `app/Models/Hooks/User.js` file to
         * check the hashPassword method
         */
        this.addHook('beforeCreate', 'User.hashPassword')
    }

    /**
     * A relationship on tokens is required for auth to
     * work. Since features like `refreshTokens` or
     * `rememberToken` will be saved inside the
     * tokens table.
     *
     * @method tokens
     *
     * @return {Object}
     */
    tokens() {
        return this.hasMany('App/Models/Token')
    }
}

module.exports = User
