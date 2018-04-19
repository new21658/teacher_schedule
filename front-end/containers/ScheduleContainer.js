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
import { receiveCourses, fetchCourses } from "../redux/actions/courseAction";
import axios from "axios";
import { checkTimeOverlaps } from "../redux/utilities/index";
import { fetchOwnCourses } from "../redux/actions/ownCourseAction"



function fetchCoursesByTermAndRoom(teacher, room, dispatch) {
    
  console.log("teacher", teacher, "room", room);
     dispatch(fetchCourses({
      term: teacher, 
      status: 'A',
      responsed: 1, 
      room: room
     }))

}


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

    changeCourse: course => {

      dispatch(changeCourse(course));

    }
  }
}



const mergeProps = (stateProps, dispatchProps, ownProps) => {


  const schedule = stateProps.schedule;
  const courses = stateProps.courses;
  return Object.assign({}, stateProps, dispatchProps, {


    booking: () => {
      dispatchProps.dispatch(startBooking())
    },

    selectTerm: term => {

      dispatchProps.dispatch(selectTerm(term));

      dispatchProps.dispatch(fetchOwnCourses({ 
        term: term,
        status: 'A',
        responsed: 0
       }));

       if(stateProps.schedule.roomSelected != -1) {
        fetchCoursesByTermAndRoom(term, stateProps.schedule.roomSelected, dispatchProps.dispatch)
       }
    },

    changeRoom: room => {

      dispatchProps.dispatch(changeRoom(room));

      if(stateProps.schedule.termSelected != -1) {
        fetchCoursesByTermAndRoom(stateProps.schedule.termSelected, room, dispatchProps.dispatch)
      }
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
        if(stateProps.schedule.startTimeSelected != -1 && stateProps.schedule.startTimeSelected != -1) {
            isOverlaps = courses.some(c => {
            if (c.day == day) {
                return checkTimeOverlaps(stateProps.schedule.startTimeSelected, stateProps.schedule.endTimeSelected, c.start_time, c.end_time);
            }
            });
            dispatchProps.dispatch(triggerTimeOverlaps(isOverlaps));
        }
        dispatchProps.dispatch(changeDay(day));
      },


    changeStartTime: time => {
        let isOverlaps = false;
        if(stateProps.schedule.daySelected != -1 && stateProps.schedule.endTimeSelected != -1) {
            isOverlaps = courses.some(c => {
            if (c.day == (stateProps.schedule.daySelected)) {
                alert("end time selected " + stateProps.schedule.endTimeSelected);
                return checkTimeOverlaps(time, stateProps.schedule.endTimeSelected, c.start_time, c.end_time);
            }
            });
            dispatchProps.dispatch(triggerTimeOverlaps(isOverlaps));
        }
        dispatchProps.dispatch(changeStartTime(time));
      },


    changeEndTime: time => {
        let isOverlaps = false;
        if(stateProps.schedule.daySelected != -1 && stateProps.schedule.startTimeSelected != -1) {
            isOverlaps = courses.some(c => {
            if (c.day == (stateProps.schedule.daySelected)) {
                return checkTimeOverlaps(stateProps.schedule.startTimeSelected, time, c.start_time, c.end_time);
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
