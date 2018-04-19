"use strict";

const { json_res, json_res_error } = use("App/Utils/Response");
const Course = use("App/Models/Course");
const Term = use("App/Models/Term");
const Teacher = use("App/Models/Teacher");
const StudentGroup = use("App/Models/StudentGroup");
const Subject = use("App/Models/Subject");
const luxon = use("luxon");
const DateTime = luxon.DateTime;

// Helpers

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

async function bookingCourse (courseId, term, room, day, start, end) {

    let thisTimeIsAvailable = await Course.thisTimeIsAvailable(
      term,
      room,
      day,
      start,
      end
    );

    if (!thisTimeIsAvailable) {
      throw new Error("This time has booked by someone else.");
    }


    let course = await Course.find(courseId);

    course.study_room_id = room

    course.day = day;

    course.start_time = DateTime.fromFormat(
      start,
      "HH:mm"
    ).toFormat("HH:mm");

    course.end_time = DateTime.fromFormat(
      end,
      "HH:mm"
    ).toFormat("HH:mm");

    course.teacher_responsed = 1;

    await course.save();

    return true;

}

// end Helpers


class AdminCourseController {

  async index({ view }) {

    try {
      const terms = await Term.query().where('status', 'A').fetch();

      const teachers = await Teacher.query().whereHas('user', function(qb) {
        qb.where('status', 'A')
    }).fetch();

      const groups = await StudentGroup.query().where('status', 'A').fetch();

      const subjects = await Subject.query().where('status', 'A').fetch();

      return view.render("admin/course", {
        terms: JSON.stringify(terms),
        teachers: JSON.stringify(teachers),
        groups: JSON.stringify(groups),
        subjects: JSON.stringify(subjects)
      });
    } catch (ex) {
      console.log(ex);
    }
  }

  async courseAll({ request }) {

    try {

      let query = request.get();

      let status = query.status || "";

      let approved = query.approved || "";

      let responsed = query.responsed || "";

      let term = query.term || "";

      let teacher = query.teacher || "";

      let room = query.room || "";

      let courses = await Course.query()
        .with("subject")
        .with("room")
        .with("teacher")
        .with("term")
        .with("group")
        .where("courses.status", "like", "%" + status + "%")
        .andWhere("courses.approved", "like", "%" + approved + "%")
        .andWhere("courses.teacher_responsed", "like", "%" + responsed + "%")
        .andWhere("courses.term_id", "like", "%" + term + "%")
        .andWhere("courses.study_room_id", "like", "%" + room + "%")
        .andWhere("courses.teacher_id", "like", "%" + teacher + "%")
        .fetch();

        // console.log(Course.query()
        // .where("courses.status", "like", "%" + status + "%")
        // .andWhere("courses.approved", "like", "%" + approved + "%")
        // .andWhere("courses.teacher_responsed", "like", "%" + responsed + "%")
        // .andWhere("courses.term_id", "like", "%" + term + "%")
        // .andWhere(function() {
        //   this.where('courses.study_room_id', 'like', '%' + room + '%')
        //   this.orWhere('courses.study_room_id', 'IS', 'NULL')
        // })
        // .andWhere("courses.teacher_id", "like", "%" + teacher + "%")
        // .toString())

      courses = withValid(courses.toJSON());

      return json_res(courses);
    } catch (ex) {
      return json_res_error(ex.toString());
    }
  }


  async courseByTeacher({ params }) {
    try {
      let courses = await Course.query()
        .with("subject")
        .with("room")
        .with("teacher")
        .with("term")
        .with("group")
        .where("courses.status", "=", "A")
        .andWhere("courses.teacher_id", params.id)
        .andWhere("courses.teacher_responsed", 0)
        .andWhere("courses.approved", "=", 0)
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
      course.term_id = req.input("term");
      course.teacher_id = req.input("teacher");
      course.subject_id = req.input("subject");
      course.student_group_id = req.input("group");

      await course.save();

      return json_res("Course Added");
    } catch (ex) {
      return json_res_error(ex.toString());
    }
  }

  /**
   *
   * ADMIN ONLY
   */
  async updateCourse({ request }) {
    try {
      let req = request;

      let course = await Course.find(request.input("id"));

      course.subject_id = req.input("subject");

      course.student_group_id = req.input("group");

      await course.save();

      return json_res("Course Updated");
    } catch (ex) {
      return json_res_error(ex.toString());
    }
  }

  /**
   *
   * TEACHER ONLY
   */

  async booking({ request }) {
    // return json_res(request.all());
    try {
      let req = request;
      let courseId = req.input("course");
      let term = req.input("term");
      let room = req.input("room");
      let day = req.input("day");
      let start = req.input("start_time");
      let end = req.input("end_time");

      let isOk = await bookingCourse(courseId, term, room, day, start, end);

      if(isOk) {
        return json_res("Course Updated");
      } 

      return json_res("Course Updated");

    } catch (ex) {

      return json_res_error(ex.toString());

    }

  }

  async approveCourse({ request }) {
    try {
      let req = request;

      let course = await Course.find(request.input("id"));

      course.approved = 1;

      await course.save();

      return json_res("Course Approved");
    } catch (ex) {
      return json_res_error(ex.toString());
    }
  }

  async updateStatus({ request }) {
    try {
      var course = await Course.find(request.input("id"));

      course.status = request.input("status");

      await course.save();

      return json_res("Status updated");
    } catch (ex) {
      return json_res_error(ex.toString());
    }
  }
}

module.exports = AdminCourseController;
