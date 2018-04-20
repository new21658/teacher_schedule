import wrapper from "../components/Page";
import React, { Component } from "react";
import { Alert } from "react-bootstrap";
import axios from "axios";
import store from "../redux/store";
import { connect } from "react-redux";
import { fetchUser } from "../redux/actions/userAction";
import { fetchTerms } from "../redux/actions/termAction";
import { fetchRooms } from "../redux/actions/roomAction";
import Schedule from "../containers/ScheduleContainer";

class Index extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <Schedule />
                </div>
            </div>
        );
    }

    componentWillMount() {
        store.dispatch(fetchUser());
        store.dispatch(fetchTerms())
        store.dispatch(fetchRooms())
    }
}

export default wrapper(Index);