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