import React, { Component } from 'react';
import "rc-time-picker/assets/index.css";
import TimePicker from 'rc-time-picker';
import moment from "moment"
import { DateTime } from "luxon";

export default class AddPanel extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            startTime: null
        };

        this.selectStartTime = this.selectStartTime.bind(this);
        this.selectEndTime = this.selectEndTime.bind(this)
    }

    selectStartTime(moment) {
        this.props.selectStartTime(moment.format("HH:mm"))
    }

    selectEndTime(moment) {
        this.props.selectEndTime(moment.format("HH:mm"))
    }

    render() {

        const toMoment = (timeStr) => {
            return moment(timeStr, 'HH:mm');
        }

        const mapTimeList = this.props.timeList.map((time, index) => {
            return (
                <option key={index}>{time.toFormat('HH:mm')}</option>
            );
        });


        return (
            <div className="panel-container">
                <form className="form">
                    <div className="row">
                        <div className="col-sm-6">
                            <label className="label-control">วิชา</label>
                            <div className="form-group">
                                <select className="form-control">
                                    <option>เลือกวิชา</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-sm-6 text-right">
                            <label style={{minWidth: "50px"}} className="label-control"></label>
                            <div className="form-group">
                                <button className="btn btn-success"><i className="fas fa-plus-circle"></i> จองห้อง</button>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-3">
                            <label className="label-control">ห้อง</label>
                            <select className="form-control">
                                <option value={-1}>กรุณาเลือกห้อง</option>
                                {
                                    this.props.rooms.map((room, index) => {
                                        return (
                                            <option key={index} value={room.study_room_id} >{ "ห้อง " + room.study_room_code + ' ประเภท ' + room.study_room_type + " " + room.study_room_location }</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className="col-sm-3">
                            <label style={{minWidth: "50px"}} className="label-control">วัน</label>
                            <select className="form-control">
                                <option value={-1}>กรุณาเลือกวัน</option>
                            {
                                this.props.days.map((day, index) => {
                                    return (
                                        <option value={index+1}>{ day }</option>
                                    )
                                })
                            }
                            </select>
                        </div>
                        <div className="col-sm-4">
                            <label style={{minWidth: "50px"}} className="label-control">เวลา</label>
                            <div className="input-group">
                                <select className="form-control">
                                    <option>เริ่ม</option>
                                    {
                                        mapTimeList
                                    }
                                </select>
                                <span className="input-group-addon">ถึง</span>
                                <select className="form-control">
                                    <option>สิ้นสุด</option>
                                    {
                                        mapTimeList
                                    }
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