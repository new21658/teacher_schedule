'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

const Route = use('Route')
const Subject = use('App/Models/Subject');


Route.get('/', async({ view }) => {
    return view.render('user.home');
});

Route.get('/login', 'LoginController.index');
Route.post('/login', 'LoginController.login');

Route.get('/test', ({ request }) => {
    return request.url();
});

Route.group(function() {
    Route.get('/', 'AdminHomeController.index').as('admin_index');
    Route.get('/user', 'AdminUserController.index').as('admin_user');
    Route.get('/user_all', 'AdminUserController.userAll').as('admin_user_all');
    Route.get('/user_search', 'AdminUserController.userSearch').as('admin_user_search');
    Route.post('/user_add', 'AdminUserController.addUser').as('admin_add_user');
    Route.post('/user_update', 'AdminUserController.updateUser').as('admin_update_user');
    Route.post('/user_update_status', 'AdminUserController.updateStatus').as('admin_user_update_status');
}).prefix('/admin');
