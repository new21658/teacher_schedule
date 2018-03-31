import React, { Component } from 'react';
import "rc-time-picker/assets/index.css";
import TimePicker from 'rc-time-picker';
import moment from "moment"

export default class AddPanel extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            startTime: null
        };
    }
    render() {
        return (
            <div className="panel-container">
                <form className="form form-inline">
                    <div className="form-group">
                        <label style={{minWidth: "50px"}} className="label-control">ห้อง</label>
                        <select className="form-control">
                            <option>กรุณาเลือกห้อง</option>

                        </select>
                    </div>
                    <div style={{ marginLeft: "5%" }} className="form-group">
                        <label style={{minWidth: "50px"}} className="label-control">เวลา</label>
                        <div className="input-group">
                            <TimePicker showSecond={false} minuteStep={15} />
                            <span className="input-group-addon">ถึง</span>
                            <TimePicker value={this.state.startTime} showSecond={false} minuteStep={15} />
                        </div>
                    </div>
                </form>

            <style jsx>
                {
                `
                    .panel-container {
                        max-width: 1140px;
                        margin: 0 auto 1em auto;
                        margin-top: 50px !important;
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