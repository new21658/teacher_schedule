import React, { Component } from "react"
import ControlPanel from "./ControlPanel"
import withConnect from "../../containers/CourseListContainer"

const fakeCourses = [
    {
        course_id: 1,
        teacher_responsed: 1,
        approved: 1,
        group: { group_name: 'CTC 57-1' },
        room: "205",
        day: "Monday",
        start_time: "12:00",
        end_time: "15:30"
    },
    {
        course_id: 1,
        teacher_responsed: 1,
        approved: 1,
        group: { group_name: 'CTC 57-1' },
        room: "205",
        day: "Monday",
        start_time: "12:00",
        end_time: "15:30"
    }
]

class CourseList extends Component {
    render() {

        const mapDay = ['', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

        const mapItems = this.props.ownCourses.map((item, index) => {
            return (
                <div key={index}>
                    <div style={{ height: "280px" }} className="col-sm-3 tch-card">
                        <div className="tch-card-body" >
                            <div className="tch-card-item">
                            <label className="tch-card-item-label">สถานะ</label> { item.approved == 1 ? 
                                <span className="label label-success">อนุมัติแล้ว</span> : item.teacher_responsed == 1 ? 
                                <span className="label label-warning">รอการอนุมัติ</span> : <span className="label label-danger">ยังไม่ได้จอง</span> }
                            </div>
                            <div className="tch-card-item">
                            <label className="tch-card-item-label">กลุ่ม</label> { item.group.student_group_name }
                            </div>
                            <div className="tch-card-item">
                            <label className="tch-card-item-label">วิชา</label> { item.subject.subject_name } ({ item.subject.subject_code })
                            </div>
                            <div className="tch-card-item">
                                <label className="tch-card-item-label">ห้อง</label> { item.room && item.room.study_room_code || <span className="text-muted">ยังไม่ได้จอง</span> }
                            </div>
                            <div className="tch-card-item">
                                <label className="tch-card-item-label">วัน</label> { item.day && item.day > 0 && mapDay[item.day] || <span className="text-muted">ยังไม่ได้จอง</span> }
                            </div>
                            <div className="tch-card-item">
                                <label className="tch-card-item-label">เวลา</label> { item.start_time && (item.start_time  + "-" + item.end_time) || <span className="text-muted">ยังไม่ได้จอง</span> }
                            </div>
                        </div>
                        <style jsx>
                            {
                                `
                                    .tch-card {
                                        background-color: white;
                                        margin: 10px;
                                        border-radius: 5px;
                                        border: 1px solid rgba(0, 0, 0, 0.1);
                                        padding: 10px;
                                        box-shadow: 0px 1px 10px 1px rgba(0, 0, 0, 0.05); 
                                    }
                                    .tch-card-body {
                                        
                                    }
                                    .tch-card-item {
                                        margin-top: 3px;
                                        margin-bottom: 5px;
                                    }
                                    .tch-card-item-label {
                                        font-weight: 600;
                                    }
                                
                                `
                            }
                        </style>
                    </div>
                </div>
            )
        })

        return (
            <div>
                <h1><span style={{ borderBottom: "3px solid #009933" }}>รายวิชา</span></h1>
                <br/>
                <ControlPanel selectTerm={this.props.selectTerm} terms={this.props.terms} selected={this.props.schedule.termSelected} />
                <div className="row">
                    {mapItems.length > 0 ? mapItems : <h3 className="text-muted text-center">ไม่พบรายวิชา</h3>}
                </div>
            </div>
        )
    }
}

export default withConnect(CourseList);