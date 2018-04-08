
import React, { Component } from "react";
import Head from "next/head";
import Header from "../containers/HeaderContainer";
import Menu from "./Menu";
import { Provider } from "react-redux";
import store from "../redux/store";
import axios from "axios";
import { receiveUser } from "../redux/actions/userAction";
import { receiveTerm } from "../redux/actions/termAction";
import { receiveRoom } from "../redux/actions/roomAction";
import { receiveOwnCourses } from "../redux/actions/ownCourseAction";
import { receiveCourses } from "../redux/actions/courseAction"

if(typeof window !== "undefined") {
    window.store = store;
}


const wrapper = (Content) => {
    return (
        class Page extends Component {
            render() {
                console.log("Page's props ", this.props);
                return (
                    <Provider store={store}>
                    <div>
                        <Head>
                            <title>Course Scheduling</title>
                            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" />
                            <link rel="stylesheet" href="/_next/static/style.css" />
                            <link rel="stylesheet" href="/style/dist/tch-style.css" />
                            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.9/css/all.css" integrity="sha384-5SOiIsAziJl6AWe0HWRKTXlfcSHKmYV4RBF18PPJ173Kzn7jzMyFuTtk8JA7QQG1" crossorigin="anonymous" />
                        </Head>
                        <Header { ...this.props } />
                        <Menu { ...this.props } />
                        <Content { ...this.props } />
                    </div>
                    </Provider>
                )
            }
            componentWillMount() {
                if(typeof window !== 'undefined') {
                axios.get('/api/user_data').then(function(res) {
                    const data = res.data.data;
                    store.dispatch(receiveUser(data));
                    console.log("teacher id: ", data.teacher_id);
                    if(data.teacher_id !== undefined || data.teacher_id !== null) {
                        axios.get('/api/course_by_teacher/' + data.teacher_id).then((res) => {
                            const data = res.data.data;
                            store.dispatch(receiveOwnCourses(data));
                        });
                    }
                });
                axios.get('/api/term_all').then((res) => {
                    const data = res.data.data;
                    store.dispatch(receiveTerm(data));
                });
                axios.get('/api/study_room_all').then((res) => {
                    const data = res.data.data;
                    store.dispatch(receiveRoom(data));
                });
            }
            }
        }
    );
} 




export default wrapper;