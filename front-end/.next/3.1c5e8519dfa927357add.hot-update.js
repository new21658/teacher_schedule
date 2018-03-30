webpackHotUpdate(3,{

/***/ "./redux/actions/scheduleAction.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SELECT_TERM; });
/* unused harmony export selectTerm */
(function () {
    var enterModule = __webpack_require__("../node_modules/react-hot-loader/index.js").enterModule;

    enterModule && enterModule(module);
})();

var SELECT_TERM = 'SELECT_TERM';

var selectTerm = function selectTerm(term) {
    return {
        type: SELECT_TERM,
        payload: term
    };
};
;

(function () {
    var reactHotLoader = __webpack_require__("../node_modules/react-hot-loader/index.js").default;

    var leaveModule = __webpack_require__("../node_modules/react-hot-loader/index.js").leaveModule;

    if (!reactHotLoader) {
        return;
    }

    reactHotLoader.register(SELECT_TERM, 'SELECT_TERM', 'C:/Users/puvanathv/OneDrive1/OneDrive/software projects/Teacher Schedule/code/front-end/redux/actions/scheduleAction.js');
    reactHotLoader.register(selectTerm, 'selectTerm', 'C:/Users/puvanathv/OneDrive1/OneDrive/software projects/Teacher Schedule/code/front-end/redux/actions/scheduleAction.js');
    leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__("../node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./redux/reducers/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux__ = __webpack_require__("../node_modules/redux/es/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__actions_userAction__ = __webpack_require__("./redux/actions/userAction.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__actions_termAction__ = __webpack_require__("./redux/actions/termAction.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__actions_scheduleAction__ = __webpack_require__("./redux/actions/scheduleAction.js");
(function () {
    var enterModule = __webpack_require__("../node_modules/react-hot-loader/index.js").enterModule;

    enterModule && enterModule(module);
})();






var user = function user() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];

    console.log("user action:", action);
    switch (action.type) {
        case __WEBPACK_IMPORTED_MODULE_1__actions_userAction__["a" /* RECEIVE_USER */]:
            return state = action.payload;
        default:
            return state;
    }
    return state;
};

var terms = function terms() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var action = arguments[1];

    switch (action.type) {
        case __WEBPACK_IMPORTED_MODULE_2__actions_termAction__["a" /* RECEIVE_TERM */]:
            {
                return action.payload;
            }
        default:
            return state;
    }
    return state;
};

var schedule = function schedule() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];

    switch (action.type) {
        case __WEBPACK_IMPORTED_MODULE_3__actions_scheduleAction__["a" /* SELECT_TERM */]:
            return action;
    }
};

var courses = function courses() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var action = arguments[1];

    console.log("coureses:", state);
    return state;
};

var _default = Object(__WEBPACK_IMPORTED_MODULE_0_redux__["b" /* combineReducers */])({
    user: user,
    terms: terms,
    courses: courses
});

/* harmony default export */ __webpack_exports__["a"] = (_default);
;

(function () {
    var reactHotLoader = __webpack_require__("../node_modules/react-hot-loader/index.js").default;

    var leaveModule = __webpack_require__("../node_modules/react-hot-loader/index.js").leaveModule;

    if (!reactHotLoader) {
        return;
    }

    reactHotLoader.register(user, "user", "C:/Users/puvanathv/OneDrive1/OneDrive/software projects/Teacher Schedule/code/front-end/redux/reducers/index.js");
    reactHotLoader.register(terms, "terms", "C:/Users/puvanathv/OneDrive1/OneDrive/software projects/Teacher Schedule/code/front-end/redux/reducers/index.js");
    reactHotLoader.register(schedule, "schedule", "C:/Users/puvanathv/OneDrive1/OneDrive/software projects/Teacher Schedule/code/front-end/redux/reducers/index.js");
    reactHotLoader.register(courses, "courses", "C:/Users/puvanathv/OneDrive1/OneDrive/software projects/Teacher Schedule/code/front-end/redux/reducers/index.js");
    reactHotLoader.register(_default, "default", "C:/Users/puvanathv/OneDrive1/OneDrive/software projects/Teacher Schedule/code/front-end/redux/reducers/index.js");
    leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__("../node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ })

})
//# sourceMappingURL=3.1c5e8519dfa927357add.hot-update.js.map