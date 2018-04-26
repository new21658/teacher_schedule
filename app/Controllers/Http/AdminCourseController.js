"use strict";

const { json_res, json_res_error } = use("App/Utils/Response");
const DB = use("Database");
const Course = use("App/Models/Course");
const Term = use("App/Models/Term");
const Teacher = use("App/Models/Teacher");
const StudentGroup = use("App/Models/StudentGroup");
const Subject = use("App/Models/Subject");
const luxon = use("luxon");
const DateTime = luxon.DateTime;
const sgMail = use('@sendgrid/mail');
const _ = require("lodash")
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
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

async function sendNotificationToUserByEmail (title, term, subject, group, emails) {
    emails = _.uniq(emails);
    try{
    const msg = {
      from: 'teachermaiexl@ced.com',
      to: emails,
      subject: title,
      html: `
        <strong>กรุณาลงทะเบียนคอร์ส ปีการศึกษา ${term} ในรายวิชา ${subject} กลุ่ม ${group}</strong>
        <a href="teacherschedule-env.r8nhbumyhm.ap-southeast-1.elasticbeanstalk.com/">ลงทะเบียน</a>
      `,
    };
    sgMail.send(msg);
  } catch(ex) {
    console.error(ex.toString());
  }
}

// end Helpers


class AdminCourseController {

  async index({ view }) {

    try {
      const terms = await Term.query()
      .where('status', 'A')
      .orderBy(DB.raw('year(term_year)'), 'DESC')
      .orderBy('term', 'DESC')
      .fetch();

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

      courses = withValid(courses.toJSON());

      return json_res(courses);
    } catch (ex) {
      return json_res_error(ex.toString());
    }
  }

  async report({ request, view }) {

    try {

      const q = request.get();

      const term = await Term.find(q.term);

      const courses = await Course.query()
      .where('courses.term_id', '=', q.term)
      .where('courses.status', '=', q.status || 'A')
      .where('courses.approved', '=', q.approved || 1)
      .where('courses.teacher_responsed', '=', q.responsed || 1)
      .with('subject')
      .with('term')
      .with('group')
      .with('room')
      .with('teacher')
      .orderBy('courses.teacher_id')
      .orderBy('courses.day')
      .orderBy('courses.start_time')
      // .leftJoin('terms', 'terms.term_id', '=', 'courses.term_id')
      // .orderBy('terms.term', 'DESC')
      // .orderBy('terms.term_year')
      .fetch()

      return view.render('report/course', {
        request: request,
        parseInt: parseInt,
        term: term.toJSON(),
        day_of_week: ['', 'จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์', 'อาทิตย์'],
        courses: JSON.parse(JSON.stringify(courses))
      });

    } catch(ex) {
      return ex.toString();
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

      const req = request;
      let teachers = req.input('teachers');
      let data = teachers.map((teacher) => {
        return {
          term_id: req.input('term'),
          subject_id: req.input('subject'),
          student_group_id: req.input('group'),
          teacher_id: teacher
        }
      })
      
      let courses = await Course.createMany(data);

      const sendEmail = req.input('send_email');

      if(sendEmail) {
          let term = await Term.find(req.input('term'));
          const subject = await Subject.find(req.input('subject'));
          const group = await StudentGroup.find(req.input('group'));
          const teacher_ids = courses.map(function(c) { return c.teacher_id })
          teachers = await Teacher.query().whereIn("teacher_id", teacher_ids).with('user').fetch();
          const emails = teachers.toJSON().map(function(t) {
            return t.user.email
          })
          term = JSON.parse(JSON.stringify(term));
          await sendNotificationToUserByEmail(
            "แจ้งเตือน: ลงทะเบียนจองห้อง", 
            term.term + "/" + term.term_year, 
            subject.subject_name, 
            group.student_group_name, 
            emails)
      }

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
