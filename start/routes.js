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

Route.get('/login', 'LoginController.index').as('login_page').middleware(['redirectIfLoggedIn']);
Route.post('/login', 'LoginController.login').as('login').middleware(['redirectIfLoggedIn']);
Route.get('/logout', 'LoginController.logout').as('logout');

Route.group(function() {
    Route.get('/', 'AdminHomeController.index').as('admin_index');
    Route.get('/user', 'AdminUserController.index').as('admin_user');
    Route.get('/user_all', 'AdminUserController.userAll').as('admin_user_all');
    Route.get('/user_search', 'AdminUserController.userSearch').as('admin_user_search');
    Route.post('/user_add', 'AdminUserController.addUser').as('admin_add_user');
    Route.post('/user_update', 'AdminUserController.updateUser').as('admin_update_user');
    Route.post('/user_update_status', 'AdminUserController.updateStatus').as('admin_user_update_status');

    Route.get('/subject', 'AdminSubjectController.index').as('admin_subject');
    Route.get('/subject_all', 'AdminSubjectController.subjectAll').as('admin_subject_all');
    Route.get('/subject_search', 'AdminSubjectController.subjectSearch').as('admin_subject_search');
    Route.post('/subject_add', 'AdminSubjectController.addSubject').as('admin_add_subject');
    Route.post('/subject_update', 'AdminSubjectController.updateSubject').as('admin_update_subject');
    Route.post('/subject_update_status', 'AdminSubjectController.updateStatus').as('admin_subject_update_status');

    Route.get('/study_room', 'AdminStudyRoomController.index').as('admin_study_room');
    Route.get('/study_room_all', 'AdminStudyRoomController.studyRoomAll').as('admin_study_room_all');
    Route.get('/study_room_search', 'AdminStudyRoomController.studyRoomSearch').as('admin_study_room_search');
    Route.post('/study_room_add', 'AdminStudyRoomController.addStudyRoom').as('admin_add_study_room');
    Route.post('/study_room_update', 'AdminStudyRoomController.updateStudyRoom').as('admin_update_study_room');
    Route.post('/study_room_update_status', 'AdminStudyRoomController.updateStudyRoomStatus').as('admin_update_status_study_room');

    Route.get('/term', 'AdminTermController.index').as('admin_term');
    Route.get('/term_all', 'AdminTermController.termAll').as('admin_term_all');
    Route.post('/term_add', 'AdminTermController.addTerm').as('admin_add_term');

}).middleware(['detectAdmin']).prefix('/admin');

Route.get('/', async({ view }) => {
    return view.render('user.home');
}).as('user_index').middleware(['detectUser']);



Route.get('/test', ({ request }) => {
    return "TESTTT";
}).middleware(['auth', 'redirectIfLoggedIn']);
