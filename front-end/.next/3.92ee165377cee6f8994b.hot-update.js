webpackHotUpdate(3,{

/***/ "./components/index/Table.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("../node_modules/react/cjs/react.development.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
var _jsxFileName = "C:\\Users\\puvanathv\\OneDrive1\\OneDrive\\software projects\\Teacher Schedule\\code\\front-end\\components\\index\\Table.js";


(function () {
    var enterModule = __webpack_require__("../node_modules/react-hot-loader/index.js").enterModule;

    enterModule && enterModule(module);
})();

var Table = function Table(props) {
    var width = 60;
    var widthOfTable = 60 * props.intervals.length;

    var mapTimstampToMinute = function mapTimstampToMinute(ts) {
        return ts / 1000 / 60;
    };

    var mapTimeToPx = function mapTimeToPx(start, end) {
        var diff = end - start; // return timestamps
        console.log("-----diff------", diff);
        diff = mapTimstampToMinute(diff);
        // const startPx = start.minute;
        // const endPx = end.minute;
        // const diff = startPx - endPx;
        return diff;
    };

    var mapOffsetTime = function mapOffsetTime(start) {
        return width + start.minute;
    };

    // const mapCourses = props.courses.map((course, index) => {
    //     const widthPx = mapTimeToPx(course.start_time, course.end_time);
    //     return (
    //         <div style={{ width: widthPx }} className="highlight-table">
    //             { course.start_time.toFormat('HH:mm') }
    //         </div>
    //     );
    // });

    var mapTimes = props.intervals.map(function (inv, index) {
        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            "div",
            { key: index, className: "schedule-col-h", style: { width: width + "px" }, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 35
                }
            },
            inv.start.toFormat('HH:mm')
        );
    });

    var mapDays = props.days.map(function (day, index) {
        var emptyBox = props.intervals.map(function (item, index) {
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", { key: index, className: "schedule-col", style: { width: width + "px" }, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 43
                }
            });
        });
        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            "div",
            { key: index, className: "schedule-row", __source: {
                    fileName: _jsxFileName,
                    lineNumber: 46
                }
            },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "div",
                { className: "schedule-col-h", style: { width: width + "px" }, __source: {
                        fileName: _jsxFileName,
                        lineNumber: 47
                    }
                },
                day
            ),
            props.courses.map(function (course, _index) {
                var widthPx = mapTimeToPx(course.start_time, course.end_time);
                var dayOfWeek = index + 1;
                var shouldRender = course.date.weekday == dayOfWeek;
                return shouldRender ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { key: _index, style: { width: widthPx, marginLeft: mapOffsetTime(course.start_time) }, className: "highlight-table", __source: {
                            fileName: _jsxFileName,
                            lineNumber: 57
                        }
                    },
                    course.start_time.toFormat('HH:mm')
                ) : null;
            }),
            emptyBox
        );
    });

    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        "div",
        { className: "row", __source: {
                fileName: _jsxFileName,
                lineNumber: 69
            }
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            "div",
            { className: "col-sm-12", __source: {
                    fileName: _jsxFileName,
                    lineNumber: 70
                }
            },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "div",
                { className: "table-responsive schedule", __source: {
                        fileName: _jsxFileName,
                        lineNumber: 71
                    }
                },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "schedule-row", __source: {
                            fileName: _jsxFileName,
                            lineNumber: 72
                        }
                    },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "schedule-col-h", style: { width: width + "px" }, __source: {
                                fileName: _jsxFileName,
                                lineNumber: 73
                            }
                        },
                        "T/D"
                    ),
                    mapTimes
                ),
                mapDays
            )
        )
    );
};

var _default = Table;
/* harmony default export */ __webpack_exports__["a"] = (_default);
;

(function () {
    var reactHotLoader = __webpack_require__("../node_modules/react-hot-loader/index.js").default;

    var leaveModule = __webpack_require__("../node_modules/react-hot-loader/index.js").leaveModule;

    if (!reactHotLoader) {
        return;
    }

    reactHotLoader.register(Table, "Table", "C:/Users/puvanathv/OneDrive1/OneDrive/software projects/Teacher Schedule/code/front-end/components/index/Table.js");
    reactHotLoader.register(_default, "default", "C:/Users/puvanathv/OneDrive1/OneDrive/software projects/Teacher Schedule/code/front-end/components/index/Table.js");
    leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__("../node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ })

})
//# sourceMappingURL=3.92ee165377cee6f8994b.hot-update.js.map