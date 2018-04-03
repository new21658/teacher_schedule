"use strict";

const { json_res, json_res_error } = use("App/Utils/Response");
const Course = use("App/Models/Course");
const Term = use("App/Models/Term");
const Teacher = use("App/Models/Teacher");
const StudentGroup = use("App/Models/StudentGroup");
const Subject = use("App/Models/Subject");

const withValid = courses => {
  if (!Array.isArray(courses)) {
    courses = [courses];
  }
  courses = courses.map(course => {
    let valid = Object.values(course).every(c => c != null || c != undefined);
    course.valid = valid;
    return course;
  });
  return courses;
};

class AdminCourseController {
    
  async index({ view }) {
    try{
    const terms = await Term.all();
    const teachers = await Teacher.all();
    const groups = await StudentGroup.all();
    const subjects = await Subject.all();
    return view.render("admin/course", { 
      terms: JSON.stringify(terms),
      teachers: JSON.stringify(teachers),
      groups: JSON.stringify(groups),
      subjects: JSON.stringify(subjects)
    });
    } catch(ex) {
        console.log(ex);
    }
  }

  async courseAll() {
    try {
      let courses = await Course.query()
        .with("subject")
        .with("room")
        .with("teacher")
        .with("term")
        .with("group")
        .where("courses.status", "=", "A")
        .fetch();

      courses = withValid(courses.toJSON());

      return json_res(courses);
    } catch (ex) {
      return json_res_error(ex.toString());
    }
  }

  async courseAllWithNotApproved() {
    try {
      let courses = await Course.query()
        .with("subject")
        .with("room")
        .with("teacher")
        .with("term")
        .with("group")
        .where("courses.status", "=", "A")
        .andWhere('courses.approved', '=', 0)
        .fetch();

      courses = withValid(courses.toJSON());

      return json_res(courses);
    } catch (ex) {
      return json_res_error(ex.toString());
    }
  }

  async courseByTerm({ params }) {
    try {

      let courses = await Course.byTerm(params.id);
      courses = withValid(courses.toJSON());
      return json_res(courses);

    } catch (ex) {
      return json_res_error(ex.toString());
    }
  }

  async addCourse({ request }) {
    try {

      let req = request;
      let course = new Course();
      course.term_id = req.input('term')
      course.teacher_id = req.input('teacher');
      course.subject_id = req.input('subject')
      course.student_group_id = req.input('group')

      await course.save()

      return json_res('Course Added')

    } catch (ex) {
      return json_res_error(ex.toString());
    }
  }

  async updateCourse({ request }) {
    try {

      let req = request;
      let course = await Course.find(request.input('id'));
      course.term_id = req.input('term')
      course.teacher_id = req.input('teacher');
      course.subject_id = req.input('subject')
      course.student_group_id = req.input('group')
      await course.save()
      return json_res('Course Updated')
    } catch (ex) {
      return json_res_error(ex.toString());
    }
  }

  async approveCourse({ request }) {
    try {
      let req = request
      let course = await Course.find(request.input('id'))
      course.approved = 1
      await course.save()
      return json_res('Course Approved')
    } catch (ex) {
      return json_res_error(ex.toString());
    }
  }


  async updateStatus({ request }) {
    try {
        var course = await Course.find(request.input('id'));
        course.status = request.input('status');
        await course.save();
        return json_res("Status updated");
    } catch(ex) {
        return json_res_error(ex.toString());
    }
  }

}

module.exports = AdminCourseController;
