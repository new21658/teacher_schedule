import React, { Component } from "react";
import { Grid, Row, Col,   } from "react-bootstrap";
import { DateTime, Interval } from "luxon";

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

        this.intervals = (() => {
            return Interval.fromDateTimes(this.startTime, 
           this.endTime).splitBy({ hours: 1 })
        })(),

        this.state = {
            showAddModal: false,
            courses: (() => {
                return [
                    {
                    start_time: DateTime.fromObject({ hours: 7 }),
                    end_time: DateTime.fromObject({ hours: 10 }),
                    date: DateTime.local()
                },
                {
                    start_time: DateTime.fromObject({ hours: 8 }),
                    end_time: DateTime.fromObject({ hours: 12, minutes: 30 }),
                    date: DateTime.local().minus({ days: 1 })
                },
                {
                    start_time: DateTime.fromObject({ hours: 7 }),
                    end_time: DateTime.fromObject({ hours: 7, minutes: 45 }),
                    date: DateTime.local().plus({ days: 2 })
                }
            ]
            })()
        }
        this.toggleModal = this.toggleModal.bind(this);
        this.showAddModal = this.showAddModal.bind(this);
        this.hideAddModal = this.hideAddModal.bind(this);
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


    render() {
        return (
            <div>
                <div className="panel panel-default">
                    <div className="panel-heading"><h1>ตารางสอน</h1></div>
                    <div className="panel-body">
                    <AddModal hideAddModal={this.hideAddModal} toggleModal={this.toggleModal} show={this.state.showAddModal} />
                    <ControlPanel toggleModal={this.toggleModal} selectTerm={this.props.selectTerm} terms={this.props.terms} />
                    <AddPanel days={this.days} />
                    <Table
                        startTime={this.startTime}
                        endTime={this.endTime} 
                        courses={this.state.courses} 
                        days={this.days} 
                        intervals={this.intervals} />
                    </div>
                </div>
            </div>
        )
    }


}

export default Schedule;


