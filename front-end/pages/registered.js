import wrapper from "../components/Page";
import React, { Component } from "react"
import ControlPanel from "../components/registered/ControlPanel"
import store from "../redux/store"
import axios from "axios"

import CourseList from "../components/registered/CourseList"
import { fetchUser } from "../redux/actions/userAction";
import { fetchTerms } from "../redux/actions/termAction";
import { fetchRooms } from "../redux/actions/roomAction";


class Registered extends Component {

    render() {
        return (
            <div className="container">
                <CourseList />
            </div>
        );
    }
    componentWillMount() {
        store.dispatch(fetchUser());
        store.dispatch(fetchTerms())
        store.dispatch(fetchRooms())
    }
}


export default wrapper(Registered);