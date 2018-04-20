import React, { Component } from "react"
import { connect } from "react-redux"
import { selectTerm } from "../redux/actions/scheduleAction";
import { fetchOwnCourses } from "../redux/actions/ownCourseAction"
import { receiveCourses, fetchCourses } from "../redux/actions/courseAction";
import axios from "axios"


const mapStateToProps = ({ user, terms, ownCourses, schedule }) => {
    return {
        user,
        terms,
        ownCourses,
        schedule
    }
}

const mapDispatchToProps = (dispatch) => {
    return {


        selectTerm: term => {

            dispatch(selectTerm(term));

            dispatch(fetchOwnCourses({ 
              term: term
             }));

             dispatch(fetchCourses({
                term: term,
                responsed: 1
             }));

        },
    }
}


const withConnect = (component) => {
    return connect(mapStateToProps, mapDispatchToProps)(component)
}





export default withConnect;