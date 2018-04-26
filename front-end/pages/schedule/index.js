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
    }



    render() {
        return (
        <div className="container">
            <div className="row">
                <Schedule /> 
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