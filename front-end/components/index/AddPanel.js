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

        this.selectStartTime = this.selectStartTime.bind(this);
        this.selectEndTime = this.selectEndTime.bind(this)
        this.isChangeTimeValid = this.isChangeTimeValid.bind(this);
        this.onChangeStartTime = this.onChangeStartTime.bind(this)
        this.onChangeEndTime = this.onChangeEndTime.bind(this)
        this.onChangeDay = this.onChangeDay.bind(this)
        this.onChangeCourse = this.onChangeCourse.bind(this)
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

        console.log('AddPanel\'s props', this.props);

        const mapDaysList = this.props.days.map((day, index) => (
            <option selected={isDaySelected(this.props.schedule.daySelected, index+1)} key={index} value={index+1}>{ day }</option>)
        );

        const mapStartTimeList = this.props.timeList.map((time, index) => {
            return (
                <option 
                    selected={isSelectedStartTime(this.props.schedule.startTimeSelected, time)}
                    key={index} 
                    value={time.start.toFormat('HH:mm')}>{time.start.toFormat('HH:mm')}</option>
            );
        });

        const mapEndTimeList = this.props.timeList.map((time, index) => {
            return (
                <option 
                    selected={isSelectedEndTime(this.props.schedule.endTimeSelected, time)}
                    key={index} 
                    value={time.end.toFormat('HH:mm')}>{time.end.toFormat('HH:mm')}</option>
            );
        });

        const mapSubjects = this.props.subjects.map((subject, index) => (
            <option key={index} value={subject.course_id}>{ subject.subject_name + " (" + subject.subject_code + ")" }</option>
        ));

        const mapRooms = this.props.rooms.map((room, index) => {
            return (
                <option key={index} value={room.study_room_id} >{ "ห้อง " + room.study_room_code + ' ประเภท ' + room.study_room_type + " " + room.study_room_location }</option>
            )
        })
                 


        return (
            <div className="panel-container">
                <form className="form">
                    <div className="row">
                        <div className="col-sm-6">
                            <label className="label-control">วิชา</label>
                            <div className="form-group">
                                <select onChange={this.onChangeCourse} className="form-control">
                                    {
                                      mapSubjects.length < 1 ? <option>ไม่พบวิชา</option> : <option>เลือกวิชา</option>
                                    }
                                    { mapSubjects }
                                </select>
                            </div>
                        </div>
                        <div className="col-sm-6 text-right">
                            <label style={{minWidth: "50px"}} className="label-control"></label>
                            <div className="form-group">
                                <button className="btn btn-success"><i className="fas fa-plus-circle"></i> จอง</button>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-3">
                            <label className="label-control">ห้อง</label>
                            <select  className="form-control">
                                { mapRooms.length < 1 ? <option>ไม่พบห้อง</option> : <option value={-1}>กรุณาเลือกห้อง</option> }
                                { mapRooms }
                            </select>
                        </div>
                        <div className="col-sm-3">
                            <label style={{minWidth: "50px"}} className="label-control">วัน</label>
                            <select onChange={this.onChangeDay} className="form-control">
                                <option value={-1}>กรุณาเลือกวัน</option>
                                { mapDaysList }
                            </select>
                        </div>
                        <div className="col-sm-4">
                            <label style={{minWidth: "50px"}} className="label-control">เวลา</label>
                            <div className="input-group">
                                <select onChange={this.onChangeStartTime} className="form-control">
                                    <option>เริ่ม</option>
                                    { mapStartTimeList }
                                </select>
                                <span className="input-group-addon">ถึง</span>
                                <select onChange={this.onChangeEndTime} className="form-control">
                                    <option>สิ้นสุด</option>
                                    { mapEndTimeList }
                                </select>
                            </div>
                        </div>
                    </div>
                    
                </form>

            <style jsx>
                {
                `
                    .panel-container {
                        max-width: 1140px;
                        margin: 0 auto 1em auto;
                        margin-top: 20px !important;
                        background-color: whitesmoke;
                        padding: 1em;
                    }
                
                `
                }
            </style>
            </div>
        );
    }
}