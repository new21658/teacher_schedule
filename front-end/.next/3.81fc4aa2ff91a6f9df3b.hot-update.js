webpackHotUpdate(3,{

/***/ "./components/Page.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("../node_modules/react/cjs/react.development.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__public_style_dist_tch_style_css__ = __webpack_require__("../public/style/dist/tch-style.css");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__public_style_dist_tch_style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__public_style_dist_tch_style_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_next_head__ = __webpack_require__("../node_modules/next/head.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_next_head___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_next_head__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__containers_HeaderContainer__ = __webpack_require__("./containers/HeaderContainer.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Menu__ = __webpack_require__("./components/Menu.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react_redux__ = __webpack_require__("../node_modules/react-redux/es/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__redux_store__ = __webpack_require__("./redux/store.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_axios__ = __webpack_require__("../node_modules/axios/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__redux_actions_userAction__ = __webpack_require__("./redux/actions/userAction.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__redux_actions_termAction__ = __webpack_require__("./redux/actions/termAction.js");
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _jsxFileName = "C:\\Users\\puvanathv\\OneDrive1\\OneDrive\\software projects\\Teacher Schedule\\code\\front-end\\components\\Page.js";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

(function () {
    var enterModule = __webpack_require__("../node_modules/react-hot-loader/index.js").enterModule;

    enterModule && enterModule(module);
})();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }












if (typeof window !== "undefined") {
    window.store = __WEBPACK_IMPORTED_MODULE_6__redux_store__["a" /* default */];
}

var wrapper = function wrapper(Content) {
    return function (_Component) {
        _inherits(Page, _Component);

        function Page() {
            _classCallCheck(this, Page);

            return _possibleConstructorReturn(this, (Page.__proto__ || Object.getPrototypeOf(Page)).apply(this, arguments));
        }

        _createClass(Page, [{
            key: "render",
            value: function render() {
                console.log("Page's props ", this.props);
                return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    __WEBPACK_IMPORTED_MODULE_5_react_redux__["a" /* Provider */],
                    { store: __WEBPACK_IMPORTED_MODULE_6__redux_store__["a" /* default */], __source: {
                            fileName: _jsxFileName,
                            lineNumber: 24
                        }
                    },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        {
                            __source: {
                                fileName: _jsxFileName,
                                lineNumber: 25
                            }
                        },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            __WEBPACK_IMPORTED_MODULE_2_next_head___default.a,
                            {
                                __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 26
                                }
                            },
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("link", { rel: "stylesheet", href: "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css", __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 27
                                }
                            }),
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("link", { rel: "stylesheet", href: "/style/dist/tch-style.css", __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 29
                                }
                            })
                        ),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__containers_HeaderContainer__["a" /* default */], _extends({}, this.props, {
                            __source: {
                                fileName: _jsxFileName,
                                lineNumber: 31
                            }
                        })),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__Menu__["a" /* default */], _extends({}, this.props, {
                            __source: {
                                fileName: _jsxFileName,
                                lineNumber: 32
                            }
                        })),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(Content, _extends({}, this.props, {
                            __source: {
                                fileName: _jsxFileName,
                                lineNumber: 33
                            }
                        }))
                    )
                );
            }
        }, {
            key: "componentWillMount",
            value: function componentWillMount() {
                if (typeof window !== 'undefined') {
                    __WEBPACK_IMPORTED_MODULE_7_axios___default.a.get('/api/user_data').then(function (res) {
                        var data = res.data.data;
                        __WEBPACK_IMPORTED_MODULE_6__redux_store__["a" /* default */].dispatch(Object(__WEBPACK_IMPORTED_MODULE_8__redux_actions_userAction__["b" /* receiveUser */])(data));
                    });
                    __WEBPACK_IMPORTED_MODULE_7_axios___default.a.get('/api/term_all').then(function (res) {
                        var data = res.data.data;
                        __WEBPACK_IMPORTED_MODULE_6__redux_store__["a" /* default */].dispatch(Object(__WEBPACK_IMPORTED_MODULE_9__redux_actions_termAction__["b" /* receiveTerm */])(data));
                    });
                }
            }
        }, {
            key: "__reactstandin__regenerateByEval",
            value: function __reactstandin__regenerateByEval(key, code) {
                this[key] = eval(code);
            }
        }]);

        return Page;
    }(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);
};

var _default = wrapper;
/* harmony default export */ __webpack_exports__["a"] = (_default);
;

(function () {
    var reactHotLoader = __webpack_require__("../node_modules/react-hot-loader/index.js").default;

    var leaveModule = __webpack_require__("../node_modules/react-hot-loader/index.js").leaveModule;

    if (!reactHotLoader) {
        return;
    }

    reactHotLoader.register(wrapper, "wrapper", "C:/Users/puvanathv/OneDrive1/OneDrive/software projects/Teacher Schedule/code/front-end/components/Page.js");
    reactHotLoader.register(_default, "default", "C:/Users/puvanathv/OneDrive1/OneDrive/software projects/Teacher Schedule/code/front-end/components/Page.js");
    leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__("../node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ })

})
//# sourceMappingURL=3.81fc4aa2ff91a6f9df3b.hot-update.js.map