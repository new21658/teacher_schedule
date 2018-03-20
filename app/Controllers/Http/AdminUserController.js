'use strict'

var User = use('App/Models/User');
var Teacher = use('App/Models/Teacher');
var Role = use('App/Models/Role');
var { json_res, json_res_error } = use('App/Utils/Response');
var { validate } = use('Validator');
var Hash = use('Hash');

class AdminUserController {
    async index({ view }) {
        var roles = await Role.all();
        return view.render('admin.user', { roles: JSON.stringify(roles) });
    }
    async userAll({ request }) {
        var users = await User.query().with('role').with('teacher').fetch();
        return await json_res(users);
    }
    async userSearch({ request }) {
      var search = request.get('search').search;
      try{
          var users = await User.query()
          .leftJoin('roles', 'users.role_id', 'roles.role_id')
          .where(function() {
            this.where('users.full_name', 'like', '%' + search + '%')
            this.orWhere('roles.role_name', 'like', '%' + search + '%')
          })
          .with('role')
          .with('teacher')
          .fetch();
          return json_res(users);
      } catch(ex) {
        console.log(ex);
        return json_res_error(ex.toString());
      }
    }

    async updateStatus({ request }) {
        try {
            var user = await User.find(request.input('id'));
            user.status = request.input('status');
            await user.save();
            return json_res("Status updated");
        } catch(ex) {
            return json_res_error(ex.toString());
        }
    }

    async addUser({ request }) {
        // var password = await Hash.make(request.input('password').trim())
        // return json_res(password);
        try{
            var validation = await validate(request.all(), {
                username: "required|unique:users,username",
                password: 'required',
                email: 'required|email',
                full_name: 'required',
                role: 'required'
            });
            if(validation.fails()) {
                var message = validation.messages()[0].message;
                if(message == message.indexOf('unique') != -1) {
                    message = "ชื่อผู้ใช้นี้ถูกใช้แล้ว";
                }
                return json_res_error(message);
            }
                var user = new User() ;
                user.username = request.input('username').trim();
                user.password = request.input('password').trim();
                user.email = request.input('email');
                user.full_name = request.input('full_name');
                user.role_id = request.input('role');
                await user.save();

                // if teacher add to teacher
                if(request.input('role') == 1) {
                    var teacher = new Teacher();
                    teacher.teacher_name = request.input('full_name');
                    teacher.teacher_code = request.input('code');
                    teacher.user_id = user.user_id;
                    await teacher.save();
                    user.teacher_id = teacher.teacher_id;
                    await user.save();
                }

                return json_res("User Added");
        } catch(ex) {
            console.log(ex);
            return json_res_error(ex.toString());
        }

    }

    async updateUser({ request }) {
        try{
            var validation = await validate(request.all(), {
                id: 'required',
                email: 'required|email',
                full_name: 'required',
            });

            if(validation.fails()) {
                var message = validation.messages()[0].message;
                return json_res_error(message);
            }
                var user = await User.find(request.input('id'));
                if(request.input('password')) {
                    user.password = await Hash.make(request.input('password').trim());
                }
                user.email = request.input('email');
                user.full_name = request.input('full_name');
                await user.save();

                // if teacher add to teacher
                if(request.input('role') == 1) {
                    await Teacher.query().where('user_id', user.user_id).update({
                        teacher_name: request.input('full_name'),
                        teacher_code: request.input('code'),
                        user_id: user.user_id
                    });
                }

                return json_res("User Updated");
        } catch(ex) {
            console.log(ex);
            return json_res_error(ex.toString());
        }
    }
}

module.exports = AdminUserController
