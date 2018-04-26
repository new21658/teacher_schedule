import React, { Component } from "react"
import withConnect from "./TestTableContainer";
import ControlPanel from "./ControlPanel"

class TestTable extends Component {
    render() {

        const mapTests = this.props.tests.map((test, index) => {
            return (
                <tr key={index}>
                    <td>{(++index)}</td>
                    <td>{test.date}</td>
                    <td>{test.start_time + "-" + test.end_time}</td>
                    <td>{test.subject.subject_code}</td>
                    <td>{test.subject.subject_name}</td>
                    <td>{test.group.student_group_name}</td>
                    <td>{test.room.study_room_code}</td>
                    <td>{test.type == 'Final' ? 'ปลายภาค' : 'กลางภาค'}</td>
                    <td>{test.range_start + "-" + test.range_end}</td>
                </tr>
            )
        })

        const emptyRow = (
            <tr>
                <td colSpan="9" className="text-center">ไม่พบข้อมูล</td>
            </tr>
        )


        return (
            <div className="col-sm-12">
                <div className="panel panel-default">
                    <div className="tch-shadow-sm panel-body">
                        <h1><span style={{ borderBottom: "3px solid #009933" }}>ตารางสอบ</span></h1>
                        <br />
                        <br />
                        <ControlPanel
                            termSelected={this.props.testSchedule.termSelected}
                            typeSelected={this.props.testSchedule.typeSelected}
                            terms={this.props.terms}
                            changeTerm={this.props.changeTerm}
                            changeType={this.props.changeType} />
                        <br />
                        <div className="table-responsive">
                            <table className="table table-hover table-striped">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>วันที่สอบ</th>
                                        <th>เวลา</th>
                                        <th>รหัส</th>
                                        <th>วิชา</th>
                                        <th>กลุ่ม</th>
                                        <th>ห้อง</th>
                                        <th>การสอบ</th>
                                        <th>ลำดับ</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.props.tests.length > 0 ? mapTests : emptyRow
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withConnect(TestTable)