import React, { Component } from "react"


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

        const mapItems = fakeCourses.map((item, index) => {
            return (
                <tr>
                    <td>{ ++index }</td>
                    <td>{ item.approved == 1 ? <span className="label label-success">อนุมัติแล้ว</span> : item.teacher_responsed == 1 ? 'รอการอนุมัติ' : 'ยังไม่จอง' }</td>
                    <td>{ item.group.group_name }</td>
                    <td>{ item.room }</td>
                    <td>{ item.day }</td>
                    <td>{ item.start_time + "-" + item.end_time }</td>
                </tr>
            )
        })

        return (
            <div className="panel panel-default">
                <div className="panel-body">
                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>ลำดับ</th>
                                    <th>สถานะการจอง</th>
                                    <th>กลุ่ม</th>
                                    <th>ห้อง</th>
                                    <th>วัน</th>
                                    <th>เวลา</th>
                                </tr>
                            </thead>
                            <tbody>
                                { mapItems } 
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

export default CourseList;