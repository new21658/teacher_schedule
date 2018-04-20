
import React, { Component } from "react";
import Head from "next/head";
import Header from "../containers/HeaderContainer";
import Menu from "../containers/MenuContainer";
import { Provider } from "react-redux";
import store from "../redux/store";
import axios from "axios";
import { receiveUser } from "../redux/actions/userAction";
import { receiveTerm } from "../redux/actions/termAction";
import { receiveRoom } from "../redux/actions/roomAction";
import { fetchOwnCourses } from "../redux/actions/ownCourseAction";
import { receiveCourses } from "../redux/actions/courseAction"

if (typeof window !== "undefined") {
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
                            <Header {...this.props} />
                            <Menu {...this.props} />
                            <Content {...this.props} />
                        </div>
                    </Provider>
                )
            }
        }
    );
}




export default wrapper;