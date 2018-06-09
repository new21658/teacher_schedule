import React, { Component } from 'react';
import "rc-time-picker/assets/index.css";
import TimePicker from 'rc-time-picker';
import moment from "moment"
import { DateTime, Interval } from "luxon";

export default class AddPanel extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            startTime: null
        };

        this.onChangeTerm = this.onChangeTerm.bind(this);
        this.selectStartTime = this.selectStartTime.bind(this);
        this.selectEndTime = this.selectEndTime.bind(this)
        this.isChangeTimeValid = this.isChangeTimeValid.bind(this);
        this.onChangeStartTime = this.onChangeStartTime.bind(this)
        this.onChangeEndTime = this.onChangeEndTime.bind(this)
        this.onChangeDay = this.onChangeDay.bind(this)
        this.onChangeCourse = this.onChangeCourse.bind(this)
        this.onChangeRoom = this.onChangeRoom.bind(this)
        this.onBooking = this.onBooking.bind(this)
    }

    selectStartTime(moment) {
        this.props.selectStartTime(moment.format("HH:mm"))
    }

    selectEndTime(moment) {
        this.props.selectEndTime(moment.format("HH:mm"))
    }

    onChangeDay = (evt) => {
        this.props.changeDay(evt.target.value)
    }

    isChangeTimeValid = (startTime, endTime) => {
        if(startTime==-1 || endTime==-1) return true;
        const luxonStartTime = DateTime.fromFormat(startTime, 'HH:mm')
        const luxonEndTime = DateTime.fromFormat(endTime, 'HH:mm')
        return luxonStartTime < luxonEndTime; // end time must greater than start time
    }

    onChangeStartTime = (evt) => {
        if(!this.isChangeTimeValid(evt.target.value, this.props.schedule.endTimeSelected)) return alert('Start time must before end time');
        this.props.changeStartTime(evt.target.value)
    }

    onChangeEndTime = (evt) => {
        if(!this.isChangeTimeValid(this.props.schedule.startTimeSelected, evt.target.value)) return alert('End time must after start time');
        this.props.changeEndTime(evt.target.value)
    }

    onChangeCourse = (evt) => {
        this.props.changeCourse(evt.target.value)
    }

    onBooking = (evt) => {
        evt.preventDefault();
        console.log("schedulces > courseSelected >>> ", this.props.schedule.courseSelected)
        if (
            this.props.schedule.termSelected == -1 ||
            this.props.schedule.daySelected == -1 ||
            this.props.schedule.startTimeSelected == -1 ||
            this.props.schedule.endTimeSelected == -1 ||
            this.props.schedule.roomSelected == -1 ||
            this.props.schedule.courseSelected == -1
          )  return window.alert("ไม่สามารถจองได้ กรุณาตรวจสอบข้อมูล");
        if(this.props.schedule.isOverlaps) return window.alert("เวลานี้ถูกจองแล้ว กรุณาเลือกเวลาอื่น")
        this.props.booking()
    }

    onChangeRoom = (evt) => {
        this.props.changeRoom(evt.target.value);
    }

    onChangeTerm = (evt) => {
        // console.log(evt.currentTarget.value);
        this.props.selectTerm(evt.currentTarget.value)
    }

    render() {

        const isDaySelected = (day, matchedDay) => {
            return day == matchedDay;
        }

        const isSelectedStartTime = (timeString, matchedInvTime) => {
            return timeString == matchedInvTime.start.toFormat('HH:mm');
        }
        const isSelectedEndTime = (timeString, matchedInvTime) => {
            return timeString == matchedInvTime.end.toFormat('HH:mm');
        }

        const mapDaysList = this.props.days.map((day, index) => (
            <option 
                key={index} value={index+1}>{ day }</option>)
        );

        const mapStartTimeList = this.props.timeList.map((time, index) => {
            return (
                <option 
                    key={index} 
                    value={time.start.toFormat('HH:mm')}>{time.start.toFormat('HH:mm')}</option>
            );
        });

        const mapEndTimeList = this.props.timeList.map((time, index) => {
            return (
                <option 
                    key={index} 
                    value={time.end.toFormat('HH:mm')}>{time.end.toFormat('HH:mm')}</option>
            );
        });

        const mapCourses = this.props.ownCourses.map((course, index) => (
            <option key={index} value={course.course_id}>{ course.subject.subject_name + " (" + course.subject.subject_code + ")" + " กลุ่ม " + course.group.student_group_name }</option>
        ));

        const mapRooms = this.props.rooms.map((room, index) => {
            return (
                <option key={index} value={room.study_room_id} >{ "ห้อง " + room.study_room_code + " " + room.study_room_location + " (" + room.study_room_type + ")" }</option>
            )
        })

        const mapTerms = this.props.terms.map((term, i) => {
            return (
                <option key={i} value={term.term_id}>{"ปี " + (parseInt(term.term_year) + 543) + " เทอม " + term.term}</option>
            );
        });
                 


        return (
            <div className="panel-container">
                <form onSubmit={this.onBooking} className="form">
                    <div className="row">
                        <div className="col-sm-2">
                            <label className="label-control">เทอม</label>
                            <select defaultValue={this.props.schedule.termSelected} onChange={this.onChangeTerm} className="form-control">
                                <option value={-1}>กรุณาเลือกเทอม</option>
                                { mapTerms }
                            </select>
                        </div>
                        <div className="col-sm-2">
                            <label className="label-control">ห้อง</label>
                            <select onChange={this.onChangeRoom}  className="form-control">
                                { mapRooms.length < 1 ? <option>ไม่พบห้อง</option> : <option value={-1}>กรุณาเลือกห้อง</option> }
                                { mapRooms }
                            </select>
                        </div>
                        <div className="col-sm-2">
                            <label className="label-control">วิชา</label>
                            <div className="form-group">
                                <select value={this.props.schedule.courseSelected} onChange={this.onChangeCourse} className="form-control">
                                    {
                                      mapCourses.length < 1 ? <option value="-1">ไม่พบวิชา</option> : <option value="-1">เลือกวิชา</option>
                                    }
                                    { mapCourses }
                                </select>
                            </div>
                        </div>
                        <div className="col-sm-2">
                            <label style={{minWidth: "50px"}} className="label-control">วัน</label>
                            <select value={this.props.schedule.daySelected} onChange={this.onChangeDay} className="form-control">
                                <option value={-1}>กรุณาเลือกวัน</option>
                                { mapDaysList }
                            </select>
                        </div>
                        <div className="col-sm-3">
                            <label style={{minWidth: "50px"}} className="label-control">เวลา</label>
                            <div className="input-group">
                                <select value={this.props.schedule.startTimeSelected} onChange={this.onChangeStartTime} className="form-control">
                                    <option>เริ่ม</option>
                                    { mapStartTimeList }
                                </select>
                                <span className="input-group-addon">ถึง</span>
                                <select value={this.props.schedule.endTimeSelected} onChange={this.onChangeEndTime} className="form-control">
                                    <option>สิ้นสุด</option>
                                    { mapEndTimeList }
                                </select>
                            </div>
                        </div>
                        <div className="col-sm-1 text-right">
                                <label style={{minWidth: "50px"}} className="label-control"></label>
                                <div className="form-group">
                                    <button className="btn btn-lg btn-success"><i className="fas fa-plus-circle"></i> จอง</button>
                                </div>
                        </div>
                    </div>
                    <div className="row">
                    </div>
                    <div className="row">

                    </div>
                    
                </form>

            <style jsx>
                {
                `
                    .panel-container {
                        max-width: 1140px;
                        margin: 0 auto 1em auto;
                        margin-top: 20px !important;
                        padding: 1em;
                    }
                
                `
                }
            </style>
            </div>
        );
    }
}