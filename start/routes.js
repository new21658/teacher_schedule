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
const next = use('next');
const nextApp = next({ dev: process.env.NODE_ENV === 'development',  dir: './front-end'});
const handle = nextApp.getRequestHandler();

nextApp.prepare().then(function() {

        console.log('next app prepend...');

        Route.get('/login', 'LoginController.index').as('login_page').middleware(['redirectIfLoggedIn']);
        Route.post('/login', 'LoginController.login').as('login').middleware(['redirectIfLoggedIn']);
        Route.get('/logout', 'LoginController.logout').as('logout');

        Route.group(function() {

            Route.get('/course', 'AdminCourseController.report').as('course_report');

            Route.get('/test', 'AdminTestController.report').as('test_report');

        }).prefix("report");
        
        Route.group(function() {

            Route.get('/user_data', 'UserController.user_data').as('user_data');

            Route.get('/course_all', 'AdminCourseController.courseAll').as('admin_course_all');
            Route.get('/course_by_teacher/:id', 'AdminCourseController.courseByTeacher').as('admin_course_by_teacher')
            Route.get('/course_by_term/:id', 'AdminCourseController.courseByTerm').as('admin_course_by_term');
            Route.post('/course_add', 'AdminCourseController.addCourse').as('admin_add_course');
            Route.post('/course_update', 'AdminCourseController.updateCourse').as('admin_update_course');
            Route.post('/course_booking', 'AdminCourseController.booking').as('admin_course_booking');
            Route.post('/course_approve', 'AdminCourseController.approveCourse').as('admin_course_approve_course');
            Route.post('/course_update_status', 'AdminCourseController.updateStatus').as('admin_course_update_status');

            Route.get('/test_all', 'AdminTestController.testAll').as('admin_test_all');
            Route.post('/test_add', 'AdminTestController.addTest').as('admin_add_test');
            Route.post("/test_update", 'AdminTestController.updateTest').as("admin_update_test")
            Route.post("/test_update_status", 'AdminTestController.updateStatus').as("admin_test_update_status")

            Route.get('/user_all', 'AdminUserController.userAll').as('admin_user_all');
            Route.get('/user_search', 'AdminUserController.userSearch').as('admin_user_search');
            Route.post('/user_add', 'AdminUserController.addUser').as('admin_add_user');
            Route.post('/user_update', 'AdminUserController.updateUser').as('admin_update_user');
            Route.post('/user_update_status', 'AdminUserController.updateStatus').as('admin_user_update_status');
        
            Route.get('/study_room_all', 'AdminStudyRoomController.studyRoomAll').as('admin_study_room_all');
            Route.get('/study_room_search', 'AdminStudyRoomController.studyRoomSearch').as('admin_study_room_search');
            Route.post('/study_room_add', 'AdminStudyRoomController.addStudyRoom').as('admin_add_study_room');
            Route.post('/study_room_update', 'AdminStudyRoomController.updateStudyRoom').as('admin_update_study_room');
            Route.post('/study_room_update_status', 'AdminStudyRoomController.updateStudyRoomStatus').as('admin_update_status_study_room');
        
            Route.get('/subject_all', 'AdminSubjectController.subjectAll').as('admin_subject_all');
            Route.get('/subject_search', 'AdminSubjectController.subjectSearch').as('admin_subject_search');
            Route.post('/subject_add', 'AdminSubjectController.addSubject').as('admin_add_subject');
            Route.post('/subject_update', 'AdminSubjectController.updateSubject').as('admin_update_subject');
            Route.post('/subject_update_status', 'AdminSubjectController.updateStatus').as('admin_subject_update_status');
        
            Route.get('/term_all', 'AdminTermController.termAll').as('admin_term_all');
            Route.get('/term_search', 'AdminTermController.termSearch').as('admin_term_search');
            Route.post('/term_add', 'AdminTermController.addTerm').as('admin_add_term');
            Route.post('/term_update', 'AdminTermController.updateTerm').as('admin_update_term');
            Route.post('/term_update_status', 'AdminTermController.updateStatusTerm').as('admin_update_status_term');
        
            Route.get('/student_group_all', 'AdminStudentGroupController.studentGroupAll').as('admin_student_group_all');
            Route.get('/student_group_search', 'AdminStudentGroupController.studentGroupSearch').as('admin_student_group_search');
            Route.post('/student_group_add', 'AdminStudentGroupController.addStudentGroup').as('admin_add_student_group');
            Route.post('/student_group_update', 'AdminStudentGroupController.updateStudentGroup').as('admin_update_student_group');
            Route.post('/student_group_update_status', 'AdminStudentGroupController.updateStatusStudentGroup').as('admin_update_status_student_group');
        
        }).prefix('api');
        
        Route.group(function() {

            Route.get('/', 'AdminHomeController.index').as('admin_index');
            Route.get('/course', 'AdminCourseController.index').as('admin_course');
            Route.get('/test', 'AdminTestController.index').as('admin_test');
            Route.get('/user', 'AdminUserController.index').as('admin_user');
            Route.get('/subject', 'AdminSubjectController.index').as('admin_subject');
            Route.get('/study_room', 'AdminStudyRoomController.index').as('admin_study_room');
            Route.get('/term', 'AdminTermController.index').as('admin_term');
            Route.get('/student_group', 'AdminStudentGroupController.index').as('admin_student_group');

        }).middleware(['detectAdmin']).prefix('/admin');

        // Route.get('/', 'HomeController.index').as('user_index').middleware(['detectUser']);

        
        // Next Js
        Route.get('*', function({ request, response, params }) {
            console.log("***");
            return handle(request.request, response.response);
        })
        

    
});





Route.get('/test', ({ request }) => {
    return "TESTTT";
}).middleware(['auth', 'redirectIfLoggedIn']);
