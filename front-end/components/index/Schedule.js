import React, { Component } from "react";
import { Grid, Row, Col,   } from "react-bootstrap";
import { DateTime, Interval } from "luxon";
import axios from "axios";

import ControlPanel from "./ControlPanel";
import AddPanel from "./AddPanel";
import Table from "./Table";
import AddModal from "./AddModal";

class Schedule extends Component {

    constructor(props) {
        super(props);
        this.startTime = DateTime.fromObject({ hours: 6 });
        this.endTime = DateTime.fromObject({ hours: 23, minutes: 59 });
        this.days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        this.timeList = Interval.fromDateTimes(this.startTime, this.endTime).splitBy({ minutes: 15 });

        this.intervals = (() => {
            return Interval.fromDateTimes(this.startTime, 
           this.endTime).splitBy({ hours: 1 })
        })(),

        this.state = {
            showAddModal: false,
            startTime: DateTime.local().toFormat("HH:mm"),
            endTime: DateTime.local().plus({ hours: 1 }).toFormat("HH:mm"),
            // courses: (() => {
            //     return [
            //         {
            //         start_time: DateTime.fromObject({ hours: 7 }),
            //         end_time: DateTime.fromObject({ hours: 10 }),
            //         day: 1
            //     },
            //     {
            //         start_time: DateTime.fromObject({ hours: 8 }),
            //         end_time: DateTime.fromObject({ hours: 12, minutes: 30 }),
            //         day: 3
            //     },
            //     {
            //         start_time: DateTime.fromObject({ hours: 7 }),
            //         end_time: DateTime.fromObject({ hours: 7, minutes: 45 }),
            //         day: 5
            //     }
            // ]
            // })()
        }
        this.toggleModal = this.toggleModal.bind(this);
        this.showAddModal = this.showAddModal.bind(this);
        this.hideAddModal = this.hideAddModal.bind(this);
        this.selectStartTime = this.selectStartTime.bind(this);
        this.selectEndTime = this.selectEndTime.bind(this);
        this.selectTime = this.selectTime.bind(this);
    }

    showAddModal() {
        this.setState((state) => {
            console.log("state", state);
            return Object.assign({}, state, { showAddModal: true }); 
        });
    }

    hideAddModal() {
        this.setState((state) => {
            console.log("state", state);
            return Object.assign({}, state, { showAddModal: false }); 
        });
    }

    toggleModal() {
        this.setState((state) => {
            console.log("state", state);
            return Object.assign({}, state, { showAddModal: !state.showAddModal }); 
        });
    }

    selectStartTime(time) {
        this.setState((state) => {
            return Object.assign({}, state, { startTime: time })
        })
    }

    selectEndTime(time) {
        this.setState((state) => {
            return Object.assign({}, state, { endTime: time })
        })
    }

    selectTime(day, start, end) {
        console.log("select day ", day, "select start ", start, "select end ", end)
        this.props.selectTime(day, start, end);
    }


    render() {

        const subjects = this.props.ownCourses.map((c) => {
            c.subject.course_id = c.course_id;
            return c.subject;
        });

        const mapCourses = this.props.courses.length > 0 ? this.props.courses.map((c) => {
            c = Object.assign({}, c); // copy new obj
            c.start_time = DateTime.fromFormat(c.start_time, 'HH:mm') || ''
            c.end_time = DateTime.fromFormat(c.end_time, 'HH:mm') || ''
            return c;
        }) : [];

        return (
            <div>
                <div className="panel panel-default">
                    <div className="panel-heading"><h1>ตารางสอน</h1></div>
                    <div className="panel-body">
                    <AddModal hideAddModal={this.hideAddModal} toggleModal={this.toggleModal} show={this.state.showAddModal} />
                    <ControlPanel 
                        toggleModal={this.toggleModal} 
                        selectTerm={this.props.selectTerm} 
                        terms={this.props.terms} />
                    <AddPanel 
                        booking={this.props.booking}
                        changeCourse={this.props.changeCourse}
                        changeDay={this.props.changeDay}
                        changeStartTime={this.props.changeStartTime}
                        changeEndTime={this.props.changeEndTime}
                        changeRoom={this.props.changeRoom}
                        timeList={this.timeList}
                        startTime={this.state.startTime}
                        endTime={this.state.endTime}
                        selectStartTime={this.selectStartTime}
                        selectEndTime={this.selectEndTime}
                        schedule={this.props.schedule}
                        rooms={this.props.rooms} 
                        subjects={subjects}
                        days={this.days} />
                    <Table
                        schedule={this.props.schedule}
                        selectTime={this.selectTime}
                        startTime={this.startTime}
                        endTime={this.endTime} 
                        courses={mapCourses} 
                        days={this.days} 
                        intervals={this.intervals} />
                    </div>
                </div>
            </div>
        )
    }
}

export default Schedule;


