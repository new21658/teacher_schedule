import React, {Component} from "react";
import {createStore} from "redux";
import withRedux from "next-redux-wrapper";
import reducer from "../redux/reducers";


/**
* @param {object} initialState
* @param {boolean} options.isServer indicates whether it is a server side or client side
* @param {Request} options.req NodeJS Request object (if any)
* @param {boolean} options.debug User-defined debug mode param
* @param {string} options.storeKey This key will be used to preserve store in global namespace for safe HMR 
*/
const makeStore = (initialState, options) => {
    return createStore(reducer, initialState);
};

class Page extends Component {
    static getInitialProps({store, isServer, pathname, query}) {
        return {foo: 'bar'}; // you can pass some custom props to component from here
    }
    render() {
        return (
            <div>
                <div>Prop from Redux {this.props.foo}</div>
                <div>Prop from getInitialProps {this.props.foo}</div>
            </div>
        )
    }
}

Page = withRedux(makeStore, state => state)(Page);

export default Page;