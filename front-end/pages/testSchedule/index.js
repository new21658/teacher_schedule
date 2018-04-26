import React, { Component } from "react"
import wrapper from "../../components/Page"

import { fetchTerms } from "../../redux/actions/termAction"
import store from "../../redux/store"

import TestTable from "./TestTable"
import ControlPanel from "./ControlPanel"

class TestSchedule extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <TestTable />
                </div>
            </div>
        )
    }

    componentWillMount() {
        store.dispatch(fetchTerms())
    }
}

export default wrapper(TestSchedule)