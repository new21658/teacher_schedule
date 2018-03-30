
import React, { Component } from "react";
import "../../public/style/dist/tch-style.css";
import Head from "next/head";
import Header from "../containers/HeaderContainer";
import Menu from "./Menu";
import { Provider } from "react-redux";
import store from "../redux/store";
import axios from "axios";
import { receiveUser } from "../redux/actions/userAction";
import { receiveTerm } from "../redux/actions/termAction";

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
                            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" />
                            {/* <link rel="stylesheet" href="/_next/static/style.css" /> */}
                            <link rel="stylesheet" href="/style/dist/tch-style.css" />
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
                });
                axios.get('/api/term_all').then((res) => {
                    const data = res.data.data;
                    store.dispatch(receiveTerm(data));
                });
            }
            }
        }
    );
} 




export default wrapper;