import { connect } from "react-redux";
import Schedule from "../components/index/Schedule";
import {
  selectTerm,
  selectTime,
  changeDay,
  changeStartTime,
  changeEndTime,
  changeCourse,
  changeRoom,
  triggerTimeOverlaps,
  startBooking
} from "../redux/actions/scheduleAction";
import { receiveCourses } from "../redux/actions/courseAction";
import axios from "axios";
import { checkTimeOverlaps } from "../redux/utilities/index";
import { fetchOwnCourses } from "../redux/actions/ownCourseAction"

const mapStateToProps = state => {
  return {
    terms: state.terms,
    courses: state.courses,
    ownCourses: state.ownCourses.filter(c => {
      return state.schedule.termSelected == c.term_id && c.teacher_responsed == 0;
    }),
    rooms: state.rooms,
    user: state.user,
    schedule: state.schedule
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {

    dispatch: dispatch,

    
    selectTerm: term => {

      dispatch(selectTerm(term));
      dispatch(fetchOwnCourses({ 
        term: term
       }));

      axios
        .get("/api/course_all?status=A&responsed=1&term=" + term)
        .then(res => {
          const data = res.data.data;
          dispatch(receiveCourses(data));
        });

    },

    changeCourse: course => {

      dispatch(changeCourse(course));

    },
    changeRoom: room => {

      dispatch(changeRoom(room))

    }
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const schedule = stateProps.schedule;
  const courses = stateProps.courses;
  return Object.assign({}, stateProps, dispatchProps, {


    booking: () => {
      dispatchProps.dispatch(startBooking())
    },


    selectTime: (day, start, end) => {
      let isOverlaps = false;
      isOverlaps = courses.some(c => {
        if (c.day == day) {
          return checkTimeOverlaps(start, end, c.start_time, c.end_time);
        }
      });
      dispatchProps.dispatch(triggerTimeOverlaps(isOverlaps));
      dispatchProps.dispatch(selectTime(day, start, end));
    },


    changeDay: day => {
        let isOverlaps = false;
        if(stateProps.schedule.startTimeSelected != -1 && schedule.startTimeSelected != -1) {
            isOverlaps = courses.some(c => {
            if (c.day == day) {
                return checkTimeOverlaps(schedule.startTimeSelected, schedule.endTimeSelected, c.start_time, c.end_time);
            }
            });
            dispatchProps.dispatch(triggerTimeOverlaps(isOverlaps));
        }
        dispatchProps.dispatch(changeDay(day));
      },


    changeStartTime: time => {
        let isOverlaps = false;
        if(schedule.daySelected != -1 && schedule.endTimeSelected != -1) {
            isOverlaps = courses.some(c => {
            if (c.day == (schedule.daySelected)) {
                alert("end time selected " + schedule.endTimeSelected);
                return checkTimeOverlaps(time, schedule.endTimeSelected, c.start_time, c.end_time);
            }
            });
            dispatchProps.dispatch(triggerTimeOverlaps(isOverlaps));
        }
        dispatchProps.dispatch(changeStartTime(time));
      },


    changeEndTime: time => {
        let isOverlaps = false;
        if(schedule.daySelected != -1 && schedule.startTimeSelected != -1) {
            isOverlaps = courses.some(c => {
            if (c.day == (schedule.daySelected)) {
                return checkTimeOverlaps(schedule.startTimeSelected, time, c.start_time, c.end_time);
            }
            });
            dispatchProps.dispatch(triggerTimeOverlaps(isOverlaps));
        }
        dispatchProps.dispatch(changeEndTime(time));
    },
  });
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(
  Schedule
);
