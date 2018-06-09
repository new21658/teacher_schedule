import React, { Component } from "react"
import Table from "../../components/index/Table"
import { DateTime, Interval } from "luxon"
import ControlPanel from "./ControlPanel"
import withConnect from "./ScheduleContainer";

class Schedule extends Component {

    constructor(props) {

        super(props)

        this.startTime = DateTime.fromObject({ hours: 6 });
        this.endTime = DateTime.fromObject({ hours: 21, minutes: 59 });
        this.days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        this.timeList = Interval.fromDateTimes(this.startTime, this.endTime).splitBy({ minutes: 15 });

        this.intervals = (() => {
            return Interval.fromDateTimes(this.startTime,
                this.endTime).splitBy({ hours: 1 })
        })()



    }


    render() {

        const mapCourses = this.props.courses.length > 0 ? this.props.courses.map((c) => {
            c = Object.assign({}, c); // copy new obj
            c.start_time = DateTime.fromFormat(c.start_time, 'HH:mm') || ''
            c.end_time = DateTime.fromFormat(c.end_time, 'HH:mm') || ''
            return c;
        }) : [];

        return (
            <div className="col-sm-12">
                <div className="tch-shadow-sm table-responsive panel panel-default">
                    <div className="panel-body">
                        <h1><span style={{ borderBottom: "3px solid #009933" }}>ตารางการใช้ห้องเรียน</span></h1>
                        <br />
                        <br />
                        <ControlPanel
                            termSelected={this.props.schedule.termSelected}
                            roomSelected={this.props.schedule.roomSelected}
                            changeTerm={this.props.changeTerm}
                            changeRoom={this.props.changeRoom}
                            terms={this.props.terms}
                            rooms={this.props.rooms} />
                        <Table
                            timeSelectable={false}
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

export default withConnect(Schedule);