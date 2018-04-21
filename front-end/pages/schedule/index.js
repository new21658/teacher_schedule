import React, { Component } from "react"
import Table from "../../components/index/Table";
import Schedule from "./Schedule"
import wrapper from "../../components/Page"
import store from "../../redux/store"
import { fetchTerms } from "../../redux/actions/termAction"
import { fetchRooms } from "../../redux/actions/roomAction"


class Index extends Component {


    constructor(props) {
        super(props)

        this.state = {
            courses: [],
            schedule: {
                termSelected: -1,
                daySelected: -1,
                startTimeSelected: -1,
                endTimeSelected: -1,
                courseSelected: -1,
                roomSelected: -1,
                isOverlaps: false
            }
        }

    }



    render() {
        return (
        <div className="container">
            <h3>ตารางสอน</h3>
            <hr />
            <div className="row">
                <Schedule 
                    courses={this.state.courses}
                    schedule={this.state.schedule}
                /> 
            </div>
        </div>
        )
    }

    componentWillMount() {
        store.dispatch(fetchTerms())
        store.dispatch(fetchRooms())
    }
}

export default wrapper(Index);