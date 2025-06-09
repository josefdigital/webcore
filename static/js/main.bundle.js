/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./public/sass/index.scss":
/*!********************************!*\
  !*** ./public/sass/index.scss ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./public/ts/index.ts":
/*!****************************!*\
  !*** ./public/ts/index.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var bootstrap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bootstrap */ "./node_modules/bootstrap/dist/js/bootstrap.esm.js");
/* harmony import */ var _sass_index_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../sass/index.scss */ "./public/sass/index.scss");
/* harmony import */ var _utils_resets__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/resets */ "./public/ts/utils/resets.ts");
/* harmony import */ var _utils_flash_messages__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/flash-messages */ "./public/ts/utils/flash-messages.ts");
/* harmony import */ var _utils_hero__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/hero */ "./public/ts/utils/hero.ts");
/* harmony import */ var _utils_form__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/form */ "./public/ts/utils/form.ts");
/* harmony import */ var _utils_subscribe__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/subscribe */ "./public/ts/utils/subscribe.ts");
/* harmony import */ var _utils_service_section__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./utils/service-section */ "./public/ts/utils/service-section.ts");









// Resets
(0,_utils_resets__WEBPACK_IMPORTED_MODULE_2__.resetServiceWorkers)();
console.log("Loading Josef.digital styles...");
var formSuccessFlash = new _utils_flash_messages__WEBPACK_IMPORTED_MODULE_3__.Flash("submission", "success", "contactUsFlash");
formSuccessFlash.watch();
var subscribeSuccessFlash = new _utils_flash_messages__WEBPACK_IMPORTED_MODULE_3__.Flash("subscription", "success", "subscribeFlash");
subscribeSuccessFlash.watch();
var hero = new _utils_hero__WEBPACK_IMPORTED_MODULE_4__.Hero();
hero.scrollDownToFormHandler();
var serviceSection = new _utils_service_section__WEBPACK_IMPORTED_MODULE_7__.ServiceSection();
serviceSection.scrollDownDoFormHandler();
var form = new _utils_form__WEBPACK_IMPORTED_MODULE_5__.Form();
form.displayErrors();
form.scrollToForm();
var subscribe = new _utils_subscribe__WEBPACK_IMPORTED_MODULE_6__.Subscribe();
subscribe.displayErrors();
subscribe.scrollToForm();


/***/ }),

/***/ "./public/ts/utils/flash-messages.ts":
/*!*******************************************!*\
  !*** ./public/ts/utils/flash-messages.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Flash: () => (/* binding */ Flash)
/* harmony export */ });
/* harmony import */ var _urls__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./urls */ "./public/ts/utils/urls.ts");

var Flash = /** @class */ (function () {
    function Flash(paramName, expectedParamValue, selector) {
        this.paramName = paramName;
        this.expectedParamValue = expectedParamValue;
        this.selector = selector;
    }
    Flash.prototype.watch = function () {
        var urlParams = new URLSearchParams(window.location.search);
        var param = urlParams.get(this.paramName);
        console.log({
            param: param,
            "expected": this.expectedParamValue,
        });
        if (param === this.expectedParamValue) {
            _urls__WEBPACK_IMPORTED_MODULE_0__.Url.removeParams();
            var element_1 = document.querySelector(".".concat(this.selector));
            if (element_1) {
                setTimeout(function () {
                    element_1.classList.add("flash--show");
                }, 500);
                setTimeout(function () {
                    element_1.classList.add("flash--hide");
                }, 5000);
            }
        }
    };
    return Flash;
}());



/***/ }),

/***/ "./public/ts/utils/form.ts":
/*!*********************************!*\
  !*** ./public/ts/utils/form.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Form: () => (/* binding */ Form)
/* harmony export */ });
/* harmony import */ var _urls__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./urls */ "./public/ts/utils/urls.ts");

var Form = /** @class */ (function () {
    function Form() {
        this.emailErrorParamName = "fullnameError";
        this.fullnameErrorParamName = "emailError";
        this.messageErrorParamName = "messageError";
        this.urlSearchParams = this.getUrlSearchParams();
        this.fullnameInputElement = document.getElementById("fullname");
        this.emailInputElement = document.getElementById("email");
        this.messageInputElement = document.getElementById("message");
    }
    Form.prototype.scrollToForm = function () {
        if (this.getFullnameErrorParam() || this.getEmailErrorParam() || this.getMessageErrorParam()) {
            var contactUsSection = document.querySelector(".contact-us-section");
            contactUsSection.scrollIntoView();
        }
    };
    Form.prototype.displayErrors = function () {
        var fullnameError = this.getFullnameErrorParam();
        var emailError = this.getEmailErrorParam();
        var messageError = this.getMessageErrorParam();
        if (fullnameError && this.fullnameInputElement) {
            this.addErrorElement(fullnameError, this.fullnameInputElement);
        }
        if (emailError && this.emailInputElement) {
            this.addErrorElement(emailError, this.emailInputElement);
        }
        if (messageError && this.messageInputElement) {
            this.addErrorElement(messageError, this.messageInputElement);
        }
        if (fullnameError || emailError || messageError) {
            this.cleanParams();
        }
    };
    Form.prototype.cleanParams = function () {
        _urls__WEBPACK_IMPORTED_MODULE_0__.Url.removeParams();
    };
    Form.prototype.addErrorElement = function (errorMsg, formElement) {
        var newErrorElement = document.createElement("div");
        newErrorElement.innerHTML = this.errorTemplate(errorMsg);
        formElement.after(newErrorElement);
    };
    Form.prototype.getUrlSearchParams = function () {
        return new URLSearchParams(window.location.search);
    };
    Form.prototype.getFullnameErrorParam = function () {
        return this.urlSearchParams.get(this.fullnameErrorParamName);
    };
    Form.prototype.getEmailErrorParam = function () {
        return this.urlSearchParams.get(this.emailErrorParamName);
    };
    Form.prototype.getMessageErrorParam = function () {
        return this.urlSearchParams.get(this.messageErrorParamName);
    };
    Form.prototype.errorTemplate = function (error) {
        return "<div class=\"alert alert-danger\" role=\"alert\">Error: ".concat(error, "</div>").trim();
    };
    return Form;
}());



/***/ }),

/***/ "./public/ts/utils/hero.ts":
/*!*********************************!*\
  !*** ./public/ts/utils/hero.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Hero: () => (/* binding */ Hero)
/* harmony export */ });
var Hero = /** @class */ (function () {
    function Hero() {
        this.heroButton = document.getElementById("heroBtn");
        this.contactUsSection = document.querySelector(".contact-us-section");
    }
    Hero.prototype.scrollDownToFormHandler = function () {
        var _this = this;
        if (this.heroButton) {
            this.heroButton.addEventListener("click", function () {
                var top = _this.contactUsSection.getBoundingClientRect().top + window.scrollY;
                window.scrollTo({ top: top, behavior: "smooth" });
            });
        }
    };
    return Hero;
}());



/***/ }),

/***/ "./public/ts/utils/resets.ts":
/*!***********************************!*\
  !*** ./public/ts/utils/resets.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   resetServiceWorkers: () => (/* binding */ resetServiceWorkers)
/* harmony export */ });
function resetServiceWorkers() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then(function (registrations) {
            for (var _i = 0, registrations_1 = registrations; _i < registrations_1.length; _i++) {
                var registration = registrations_1[_i];
                registration.unregister();
            }
        });
    }
}


/***/ }),

/***/ "./public/ts/utils/service-section.ts":
/*!********************************************!*\
  !*** ./public/ts/utils/service-section.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ServiceSection: () => (/* binding */ ServiceSection)
/* harmony export */ });
var ServiceSection = /** @class */ (function () {
    function ServiceSection() {
        this.serviceButtons = document.querySelectorAll(".service-button");
        this.contactUsSection = document.querySelector(".contact-us-section");
    }
    ServiceSection.prototype.scrollDownDoFormHandler = function () {
        var _this = this;
        if (this.serviceButtons && this.contactUsSection) {
            this.serviceButtons.forEach(function (button) {
                button.addEventListener("click", function (e) {
                    e.preventDefault();
                    var top = _this.contactUsSection.getBoundingClientRect().top + window.scrollY;
                    window.scrollTo({ top: top, behavior: "smooth" });
                });
            });
        }
    };
    return ServiceSection;
}());



/***/ }),

/***/ "./public/ts/utils/subscribe.ts":
/*!**************************************!*\
  !*** ./public/ts/utils/subscribe.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Subscribe: () => (/* binding */ Subscribe)
/* harmony export */ });
/* harmony import */ var _urls__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./urls */ "./public/ts/utils/urls.ts");

var Subscribe = /** @class */ (function () {
    function Subscribe() {
        this.emailErrorParamName = "subscriptionError";
        this.urlSearchParams = this.getUrlSearchParams();
        this.emailInputElement = document.getElementById("subscribe");
    }
    Subscribe.prototype.scrollToForm = function () {
        if (this.getEmailErrorParam()) {
            var contactUsSection = document.querySelector(".connect-section__subscribe__form");
            contactUsSection.scrollIntoView();
        }
    };
    Subscribe.prototype.displayErrors = function () {
        var emailError = this.getEmailErrorParam();
        if (emailError && this.emailInputElement) {
            this.addErrorElement(emailError, this.emailInputElement);
        }
        if (emailError) {
            this.cleanParams();
        }
    };
    Subscribe.prototype.cleanParams = function () {
        _urls__WEBPACK_IMPORTED_MODULE_0__.Url.removeParams();
    };
    Subscribe.prototype.addErrorElement = function (errorMsg, formElement) {
        var newErrorElement = document.createElement("div");
        newErrorElement.innerHTML = this.errorTemplate(errorMsg);
        formElement.after(newErrorElement);
    };
    Subscribe.prototype.getUrlSearchParams = function () {
        return new URLSearchParams(window.location.search);
    };
    Subscribe.prototype.getEmailErrorParam = function () {
        return this.urlSearchParams.get(this.emailErrorParamName);
    };
    Subscribe.prototype.errorTemplate = function (error) {
        return "<div class=\"alert alert-danger\" role=\"alert\">Error: ".concat(error, ". Please try again.</div>").trim();
    };
    return Subscribe;
}());



/***/ }),

/***/ "./public/ts/utils/urls.ts":
/*!*********************************!*\
  !*** ./public/ts/utils/urls.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Url: () => (/* binding */ Url)
/* harmony export */ });
var Url = /** @class */ (function () {
    function Url() {
    }
    Url.removeParams = function () {
        var url = new URL(window.location.href);
        url.search = "";
        window.history.replaceState({}, document.title, url.toString());
    };
    return Url;
}());



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkwebcore"] = self["webpackChunkwebcore"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendor","bootstrap"], () => (__webpack_require__("./public/ts/index.ts")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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YnBhY2s6Ly93ZWJjb3JlLy4vcHVibGljL3Nhc3MvaW5kZXguc2Nzcz81ZWVhIiwid2VicGFjazovL3dlYmNvcmUvLi9wdWJsaWMvdHMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vd2ViY29yZS8uL3B1YmxpYy90cy91dGlscy9mbGFzaC1tZXNzYWdlcy50cyIsIndlYnBhY2s6Ly93ZWJjb3JlLy4vcHVibGljL3RzL3V0aWxzL2Zvcm0udHMiLCJ3ZWJwYWNrOi8vd2ViY29yZS8uL3B1YmxpYy90cy91dGlscy9oZXJvLnRzIiwid2VicGFjazovL3dlYmNvcmUvLi9wdWJsaWMvdHMvdXRpbHMvcmVzZXRzLnRzIiwid2VicGFjazovL3dlYmNvcmUvLi9wdWJsaWMvdHMvdXRpbHMvc2VydmljZS1zZWN0aW9uLnRzIiwid2VicGFjazovL3dlYmNvcmUvLi9wdWJsaWMvdHMvdXRpbHMvc3Vic2NyaWJlLnRzIiwid2VicGFjazovL3dlYmNvcmUvLi9wdWJsaWMvdHMvdXRpbHMvdXJscy50cyIsIndlYnBhY2s6Ly93ZWJjb3JlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dlYmNvcmUvd2VicGFjay9ydW50aW1lL2NodW5rIGxvYWRlZCIsIndlYnBhY2s6Ly93ZWJjb3JlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWJjb3JlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vd2ViY29yZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3dlYmNvcmUvd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vd2ViY29yZS93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL3dlYmNvcmUvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL3dlYmNvcmUvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsImltcG9ydCBcInBvcHBlci5qc1wiXG5pbXBvcnQgXCJib290c3RyYXBcIjtcblxuaW1wb3J0IFwiLi4vc2Fzcy9pbmRleC5zY3NzXCI7XG5pbXBvcnQge3Jlc2V0U2VydmljZVdvcmtlcnN9IGZyb20gXCIuL3V0aWxzL3Jlc2V0c1wiO1xuaW1wb3J0IHtGbGFzaH0gZnJvbSBcIi4vdXRpbHMvZmxhc2gtbWVzc2FnZXNcIjtcbmltcG9ydCB7SGVyb30gZnJvbSBcIi4vdXRpbHMvaGVyb1wiO1xuaW1wb3J0IHtGb3JtfSBmcm9tIFwiLi91dGlscy9mb3JtXCI7XG5pbXBvcnQge1N1YnNjcmliZX0gZnJvbSBcIi4vdXRpbHMvc3Vic2NyaWJlXCI7XG5pbXBvcnQge1NlcnZpY2VTZWN0aW9ufSBmcm9tIFwiLi91dGlscy9zZXJ2aWNlLXNlY3Rpb25cIjtcblxuLy8gUmVzZXRzXG5yZXNldFNlcnZpY2VXb3JrZXJzKCk7XG5cbmNvbnNvbGUubG9nKFwiTG9hZGluZyBKb3NlZi5kaWdpdGFsIHN0eWxlcy4uLlwiKTtcblxuY29uc3QgZm9ybVN1Y2Nlc3NGbGFzaCA9IG5ldyBGbGFzaChcInN1Ym1pc3Npb25cIiwgXCJzdWNjZXNzXCIsIFwiY29udGFjdFVzRmxhc2hcIik7XG5mb3JtU3VjY2Vzc0ZsYXNoLndhdGNoKCk7XG5cbmNvbnN0IHN1YnNjcmliZVN1Y2Nlc3NGbGFzaCA9IG5ldyBGbGFzaChcInN1YnNjcmlwdGlvblwiLCBcInN1Y2Nlc3NcIiwgXCJzdWJzY3JpYmVGbGFzaFwiKTtcbnN1YnNjcmliZVN1Y2Nlc3NGbGFzaC53YXRjaCgpO1xuXG5jb25zdCBoZXJvID0gbmV3IEhlcm8oKTtcbmhlcm8uc2Nyb2xsRG93blRvRm9ybUhhbmRsZXIoKVxuXG5jb25zdCBzZXJ2aWNlU2VjdGlvbiA9IG5ldyBTZXJ2aWNlU2VjdGlvbigpO1xuc2VydmljZVNlY3Rpb24uc2Nyb2xsRG93bkRvRm9ybUhhbmRsZXIoKTtcblxuY29uc3QgZm9ybSA9IG5ldyBGb3JtKCk7XG5mb3JtLmRpc3BsYXlFcnJvcnMoKTtcbmZvcm0uc2Nyb2xsVG9Gb3JtKCk7XG5cbmNvbnN0IHN1YnNjcmliZSA9IG5ldyBTdWJzY3JpYmUoKTtcbnN1YnNjcmliZS5kaXNwbGF5RXJyb3JzKCk7XG5zdWJzY3JpYmUuc2Nyb2xsVG9Gb3JtKCk7XG4iLCJpbXBvcnQge1VybH0gZnJvbSBcIi4vdXJsc1wiO1xuXG5pbnRlcmZhY2UgSUZsYXNoIHtcbiAgICByZWFkb25seSBwYXJhbU5hbWU6IHN0cmluZztcbiAgICByZWFkb25seSBleHBlY3RlZFBhcmFtVmFsdWU6IHN0cmluZztcbiAgICByZWFkb25seSBzZWxlY3Rvcjogc3RyaW5nO1xufVxuXG5leHBvcnQgY2xhc3MgRmxhc2ggaW1wbGVtZW50cyBJRmxhc2gge1xuXG4gICAgcmVhZG9ubHkgcGFyYW1OYW1lOiBzdHJpbmc7XG4gICAgcmVhZG9ubHkgZXhwZWN0ZWRQYXJhbVZhbHVlOiBzdHJpbmc7XG4gICAgcmVhZG9ubHkgc2VsZWN0b3I6IHN0cmluZztcblxuICAgIGNvbnN0cnVjdG9yKHBhcmFtTmFtZTogc3RyaW5nLCBleHBlY3RlZFBhcmFtVmFsdWU6IHN0cmluZywgc2VsZWN0b3I6IHN0cmluZykge1xuICAgICAgICB0aGlzLnBhcmFtTmFtZSA9IHBhcmFtTmFtZTtcbiAgICAgICAgdGhpcy5leHBlY3RlZFBhcmFtVmFsdWUgPSBleHBlY3RlZFBhcmFtVmFsdWU7XG4gICAgICAgIHRoaXMuc2VsZWN0b3IgPSBzZWxlY3RvcjtcbiAgICB9XG5cbiAgICBwdWJsaWMgd2F0Y2goKSB7XG4gICAgICAgIGNvbnN0IHVybFBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMod2luZG93LmxvY2F0aW9uLnNlYXJjaCk7XG4gICAgICAgIGNvbnN0IHBhcmFtID0gdXJsUGFyYW1zLmdldCh0aGlzLnBhcmFtTmFtZSk7XG4gICAgICAgIGNvbnNvbGUubG9nKHtcbiAgICAgICAgICAgIHBhcmFtLFxuICAgICAgICAgICAgXCJleHBlY3RlZFwiOiB0aGlzLmV4cGVjdGVkUGFyYW1WYWx1ZSxcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChwYXJhbSA9PT0gdGhpcy5leHBlY3RlZFBhcmFtVmFsdWUpIHtcbiAgICAgICAgICAgIFVybC5yZW1vdmVQYXJhbXMoKTtcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQ6IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLiR7dGhpcy5zZWxlY3Rvcn1gKTtcbiAgICAgICAgICAgIGlmIChlbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImZsYXNoLS1zaG93XCIpO1xuICAgICAgICAgICAgICAgIH0sIDUwMCk7XG4gICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJmbGFzaC0taGlkZVwiKTtcbiAgICAgICAgICAgICAgICB9LCA1MDAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxufSIsImltcG9ydCB7VXJsfSBmcm9tIFwiLi91cmxzXCI7XG5cbmludGVyZmFjZSBJRm9ybSB7XG4gICAgdXJsU2VhcmNoUGFyYW1zOiBVUkxTZWFyY2hQYXJhbXM7XG4gICAgcmVhZG9ubHkgZnVsbG5hbWVJbnB1dEVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuICAgIHJlYWRvbmx5IGVtYWlsSW5wdXRFbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgICByZWFkb25seSBtZXNzYWdlSW5wdXRFbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgICByZWFkb25seSBmdWxsbmFtZUVycm9yUGFyYW1OYW1lOiBzdHJpbmc7XG4gICAgcmVhZG9ubHkgZW1haWxFcnJvclBhcmFtTmFtZTogc3RyaW5nO1xuICAgIHJlYWRvbmx5IG1lc3NhZ2VFcnJvclBhcmFtTmFtZTogc3RyaW5nO1xuICAgIHNjcm9sbFRvRm9ybSgpOiB2b2lkO1xuICAgIGRpc3BsYXlFcnJvcnMoKTogdm9pZDtcbn1cblxuZXhwb3J0IGNsYXNzIEZvcm0gaW1wbGVtZW50cyBJRm9ybSB7XG5cbiAgICB1cmxTZWFyY2hQYXJhbXM6IFVSTFNlYXJjaFBhcmFtcztcbiAgICByZWFkb25seSBlbWFpbElucHV0RWxlbWVudDogSFRNTEVsZW1lbnQ7XG4gICAgcmVhZG9ubHkgZnVsbG5hbWVJbnB1dEVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuICAgIHJlYWRvbmx5IG1lc3NhZ2VJbnB1dEVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuICAgIHJlYWRvbmx5IGVtYWlsRXJyb3JQYXJhbU5hbWUgPSBcImZ1bGxuYW1lRXJyb3JcIjtcbiAgICByZWFkb25seSBmdWxsbmFtZUVycm9yUGFyYW1OYW1lID0gXCJlbWFpbEVycm9yXCI7XG4gICAgcmVhZG9ubHkgbWVzc2FnZUVycm9yUGFyYW1OYW1lID0gXCJtZXNzYWdlRXJyb3JcIjtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLnVybFNlYXJjaFBhcmFtcyA9IHRoaXMuZ2V0VXJsU2VhcmNoUGFyYW1zKCk7XG4gICAgICAgIHRoaXMuZnVsbG5hbWVJbnB1dEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZ1bGxuYW1lXCIpXG4gICAgICAgIHRoaXMuZW1haWxJbnB1dEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVtYWlsXCIpO1xuICAgICAgICB0aGlzLm1lc3NhZ2VJbnB1dEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1lc3NhZ2VcIik7XG4gICAgfVxuXG4gICAgcHVibGljIHNjcm9sbFRvRm9ybSgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuZ2V0RnVsbG5hbWVFcnJvclBhcmFtKCkgfHwgdGhpcy5nZXRFbWFpbEVycm9yUGFyYW0oKSB8fCB0aGlzLmdldE1lc3NhZ2VFcnJvclBhcmFtKCkpIHtcbiAgICAgICAgICAgIGNvbnN0IGNvbnRhY3RVc1NlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbnRhY3QtdXMtc2VjdGlvblwiKTtcbiAgICAgICAgICAgIGNvbnRhY3RVc1NlY3Rpb24uc2Nyb2xsSW50b1ZpZXcoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBkaXNwbGF5RXJyb3JzKCk6IHZvaWQge1xuICAgICAgICBjb25zdCBmdWxsbmFtZUVycm9yID0gdGhpcy5nZXRGdWxsbmFtZUVycm9yUGFyYW0oKTtcbiAgICAgICAgY29uc3QgZW1haWxFcnJvciA9IHRoaXMuZ2V0RW1haWxFcnJvclBhcmFtKCk7XG4gICAgICAgIGNvbnN0IG1lc3NhZ2VFcnJvciA9IHRoaXMuZ2V0TWVzc2FnZUVycm9yUGFyYW0oKTtcbiAgICAgICAgaWYgKGZ1bGxuYW1lRXJyb3IgJiYgdGhpcy5mdWxsbmFtZUlucHV0RWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5hZGRFcnJvckVsZW1lbnQoZnVsbG5hbWVFcnJvciwgdGhpcy5mdWxsbmFtZUlucHV0RWxlbWVudCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVtYWlsRXJyb3IgJiYgdGhpcy5lbWFpbElucHV0RWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5hZGRFcnJvckVsZW1lbnQoZW1haWxFcnJvciwgdGhpcy5lbWFpbElucHV0RWxlbWVudCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG1lc3NhZ2VFcnJvciAmJiB0aGlzLm1lc3NhZ2VJbnB1dEVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMuYWRkRXJyb3JFbGVtZW50KG1lc3NhZ2VFcnJvciwgdGhpcy5tZXNzYWdlSW5wdXRFbGVtZW50KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZnVsbG5hbWVFcnJvciB8fCBlbWFpbEVycm9yIHx8IG1lc3NhZ2VFcnJvcikge1xuICAgICAgICAgICAgdGhpcy5jbGVhblBhcmFtcygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjbGVhblBhcmFtcygpOiB2b2lkIHtcbiAgICAgICAgVXJsLnJlbW92ZVBhcmFtcygpO1xuICAgIH1cblxuICAgIHByaXZhdGUgYWRkRXJyb3JFbGVtZW50KGVycm9yTXNnOiBzdHJpbmcsIGZvcm1FbGVtZW50OiBIVE1MRWxlbWVudCk6IHZvaWQge1xuICAgICAgICBjb25zdCBuZXdFcnJvckVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBuZXdFcnJvckVsZW1lbnQuaW5uZXJIVE1MID0gdGhpcy5lcnJvclRlbXBsYXRlKGVycm9yTXNnKTtcbiAgICAgICAgZm9ybUVsZW1lbnQuYWZ0ZXIobmV3RXJyb3JFbGVtZW50KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFVybFNlYXJjaFBhcmFtcygpOiBVUkxTZWFyY2hQYXJhbXMge1xuICAgICAgICByZXR1cm4gbmV3IFVSTFNlYXJjaFBhcmFtcyh3aW5kb3cubG9jYXRpb24uc2VhcmNoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldEZ1bGxuYW1lRXJyb3JQYXJhbSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy51cmxTZWFyY2hQYXJhbXMuZ2V0KHRoaXMuZnVsbG5hbWVFcnJvclBhcmFtTmFtZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRFbWFpbEVycm9yUGFyYW0oKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudXJsU2VhcmNoUGFyYW1zLmdldCh0aGlzLmVtYWlsRXJyb3JQYXJhbU5hbWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0TWVzc2FnZUVycm9yUGFyYW0oKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudXJsU2VhcmNoUGFyYW1zLmdldCh0aGlzLm1lc3NhZ2VFcnJvclBhcmFtTmFtZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBlcnJvclRlbXBsYXRlKGVycm9yOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gYDxkaXYgY2xhc3M9XCJhbGVydCBhbGVydC1kYW5nZXJcIiByb2xlPVwiYWxlcnRcIj5FcnJvcjogJHtlcnJvcn08L2Rpdj5gLnRyaW0oKTtcbiAgICB9XG59IiwiZXhwb3J0IGNsYXNzIEhlcm8ge1xuXG4gICAgcHVibGljIGhlcm9CdXR0b246IEhUTUxFbGVtZW50O1xuICAgIHB1YmxpYyBjb250YWN0VXNTZWN0aW9uOiBIVE1MRWxlbWVudDtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmhlcm9CdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhlcm9CdG5cIikgYXMgSFRNTEJ1dHRvbkVsZW1lbnQ7XG4gICAgICAgIHRoaXMuY29udGFjdFVzU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29udGFjdC11cy1zZWN0aW9uXCIpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzY3JvbGxEb3duVG9Gb3JtSGFuZGxlcigpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuaGVyb0J1dHRvbikge1xuICAgICAgICAgICAgdGhpcy5oZXJvQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgdG9wID0gdGhpcy5jb250YWN0VXNTZWN0aW9uLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCArIHdpbmRvdy5zY3JvbGxZO1xuICAgICAgICAgICAgICAgIHdpbmRvdy5zY3JvbGxUbyh7dG9wLCBiZWhhdmlvcjogXCJzbW9vdGhcIn0pO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfVxuICAgIH1cbn0iLCJleHBvcnQgZnVuY3Rpb24gcmVzZXRTZXJ2aWNlV29ya2VycygpIHtcbiAgICBpZiAoJ3NlcnZpY2VXb3JrZXInIGluIG5hdmlnYXRvcikge1xuICAgICAgICBuYXZpZ2F0b3Iuc2VydmljZVdvcmtlci5nZXRSZWdpc3RyYXRpb25zKCkudGhlbigocmVnaXN0cmF0aW9ucykgPT4ge1xuICAgICAgICAgICAgZm9yIChjb25zdCByZWdpc3RyYXRpb24gb2YgcmVnaXN0cmF0aW9ucykge1xuICAgICAgICAgICAgICAgIHJlZ2lzdHJhdGlvbi51bnJlZ2lzdGVyKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG59IiwiZXhwb3J0IGNsYXNzIFNlcnZpY2VTZWN0aW9uIHtcblxuICAgIHB1YmxpYyBzZXJ2aWNlQnV0dG9uczogTm9kZUxpc3RPZjxFbGVtZW50PlxuICAgIHB1YmxpYyBjb250YWN0VXNTZWN0aW9uOiBIVE1MRWxlbWVudDtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLnNlcnZpY2VCdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5zZXJ2aWNlLWJ1dHRvblwiKTtcbiAgICAgICAgdGhpcy5jb250YWN0VXNTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb250YWN0LXVzLXNlY3Rpb25cIik7XG5cbiAgICB9XG5cbiAgICBwdWJsaWMgc2Nyb2xsRG93bkRvRm9ybUhhbmRsZXIoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnNlcnZpY2VCdXR0b25zICYmIHRoaXMuY29udGFjdFVzU2VjdGlvbikge1xuICAgICAgICAgICAgdGhpcy5zZXJ2aWNlQnV0dG9ucy5mb3JFYWNoKGJ1dHRvbiA9PiB7XG4gICAgICAgICAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0b3AgPSB0aGlzLmNvbnRhY3RVc1NlY3Rpb24uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wICsgd2luZG93LnNjcm9sbFk7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5zY3JvbGxUbyh7IHRvcCwgYmVoYXZpb3I6IFwic21vb3RoXCIgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgfVxufSIsImltcG9ydCB7VXJsfSBmcm9tIFwiLi91cmxzXCI7XG5cbmludGVyZmFjZSBJU3Vic2NyaWJlIHtcbiAgICB1cmxTZWFyY2hQYXJhbXM6IFVSTFNlYXJjaFBhcmFtcztcbiAgICByZWFkb25seSBlbWFpbElucHV0RWxlbWVudDogSFRNTEVsZW1lbnQ7XG4gICAgcmVhZG9ubHkgZW1haWxFcnJvclBhcmFtTmFtZTogc3RyaW5nO1xuICAgIHNjcm9sbFRvRm9ybSgpOiB2b2lkO1xuICAgIGRpc3BsYXlFcnJvcnMoKTogdm9pZDtcbn1cblxuZXhwb3J0IGNsYXNzIFN1YnNjcmliZSBpbXBsZW1lbnRzIElTdWJzY3JpYmUge1xuXG4gICAgdXJsU2VhcmNoUGFyYW1zOiBVUkxTZWFyY2hQYXJhbXM7XG4gICAgcmVhZG9ubHkgZW1haWxJbnB1dEVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuICAgIHJlYWRvbmx5IGVtYWlsRXJyb3JQYXJhbU5hbWUgPSBcInN1YnNjcmlwdGlvbkVycm9yXCI7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy51cmxTZWFyY2hQYXJhbXMgPSB0aGlzLmdldFVybFNlYXJjaFBhcmFtcygpO1xuICAgICAgICB0aGlzLmVtYWlsSW5wdXRFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdWJzY3JpYmVcIik7XG4gICAgfVxuXG4gICAgcHVibGljIHNjcm9sbFRvRm9ybSgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuZ2V0RW1haWxFcnJvclBhcmFtKCkpIHtcbiAgICAgICAgICAgIGNvbnN0IGNvbnRhY3RVc1NlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbm5lY3Qtc2VjdGlvbl9fc3Vic2NyaWJlX19mb3JtXCIpO1xuICAgICAgICAgICAgY29udGFjdFVzU2VjdGlvbi5zY3JvbGxJbnRvVmlldygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGRpc3BsYXlFcnJvcnMoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGVtYWlsRXJyb3IgPSB0aGlzLmdldEVtYWlsRXJyb3JQYXJhbSgpO1xuXG4gICAgICAgIGlmIChlbWFpbEVycm9yICYmIHRoaXMuZW1haWxJbnB1dEVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMuYWRkRXJyb3JFbGVtZW50KGVtYWlsRXJyb3IsIHRoaXMuZW1haWxJbnB1dEVsZW1lbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGVtYWlsRXJyb3IpIHtcbiAgICAgICAgICAgIHRoaXMuY2xlYW5QYXJhbXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgY2xlYW5QYXJhbXMoKTogdm9pZCB7XG4gICAgICAgIFVybC5yZW1vdmVQYXJhbXMoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFkZEVycm9yRWxlbWVudChlcnJvck1zZzogc3RyaW5nLCBmb3JtRWxlbWVudDogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgbmV3RXJyb3JFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgbmV3RXJyb3JFbGVtZW50LmlubmVySFRNTCA9IHRoaXMuZXJyb3JUZW1wbGF0ZShlcnJvck1zZyk7XG4gICAgICAgIGZvcm1FbGVtZW50LmFmdGVyKG5ld0Vycm9yRWxlbWVudCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRVcmxTZWFyY2hQYXJhbXMoKTogVVJMU2VhcmNoUGFyYW1zIHtcbiAgICAgICAgcmV0dXJuIG5ldyBVUkxTZWFyY2hQYXJhbXMod2luZG93LmxvY2F0aW9uLnNlYXJjaCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRFbWFpbEVycm9yUGFyYW0oKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudXJsU2VhcmNoUGFyYW1zLmdldCh0aGlzLmVtYWlsRXJyb3JQYXJhbU5hbWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZXJyb3JUZW1wbGF0ZShlcnJvcjogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGA8ZGl2IGNsYXNzPVwiYWxlcnQgYWxlcnQtZGFuZ2VyXCIgcm9sZT1cImFsZXJ0XCI+RXJyb3I6ICR7ZXJyb3J9LiBQbGVhc2UgdHJ5IGFnYWluLjwvZGl2PmAudHJpbSgpO1xuICAgIH1cbn0iLCJleHBvcnQgY2xhc3MgVXJsIHtcbiAgICBwdWJsaWMgc3RhdGljIHJlbW92ZVBhcmFtcygpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgdXJsID0gbmV3IFVSTCh3aW5kb3cubG9jYXRpb24uaHJlZik7XG4gICAgICAgIHVybC5zZWFyY2ggPSBcIlwiO1xuICAgICAgICB3aW5kb3cuaGlzdG9yeS5yZXBsYWNlU3RhdGUoe30sIGRvY3VtZW50LnRpdGxlLCB1cmwudG9TdHJpbmcoKSk7XG4gICAgfVxufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwidmFyIGRlZmVycmVkID0gW107XG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8gPSAocmVzdWx0LCBjaHVua0lkcywgZm4sIHByaW9yaXR5KSA9PiB7XG5cdGlmKGNodW5rSWRzKSB7XG5cdFx0cHJpb3JpdHkgPSBwcmlvcml0eSB8fCAwO1xuXHRcdGZvcih2YXIgaSA9IGRlZmVycmVkLmxlbmd0aDsgaSA+IDAgJiYgZGVmZXJyZWRbaSAtIDFdWzJdID4gcHJpb3JpdHk7IGktLSkgZGVmZXJyZWRbaV0gPSBkZWZlcnJlZFtpIC0gMV07XG5cdFx0ZGVmZXJyZWRbaV0gPSBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV07XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHZhciBub3RGdWxmaWxsZWQgPSBJbmZpbml0eTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV0gPSBkZWZlcnJlZFtpXTtcblx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGNodW5rSWRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRpZiAoKHByaW9yaXR5ICYgMSA9PT0gMCB8fCBub3RGdWxmaWxsZWQgPj0gcHJpb3JpdHkpICYmIE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uTykuZXZlcnkoKGtleSkgPT4gKF9fd2VicGFja19yZXF1aXJlX18uT1trZXldKGNodW5rSWRzW2pdKSkpKSB7XG5cdFx0XHRcdGNodW5rSWRzLnNwbGljZShqLS0sIDEpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZnVsZmlsbGVkID0gZmFsc2U7XG5cdFx0XHRcdGlmKHByaW9yaXR5IDwgbm90RnVsZmlsbGVkKSBub3RGdWxmaWxsZWQgPSBwcmlvcml0eTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYoZnVsZmlsbGVkKSB7XG5cdFx0XHRkZWZlcnJlZC5zcGxpY2UoaS0tLCAxKVxuXHRcdFx0dmFyIHIgPSBmbigpO1xuXHRcdFx0aWYgKHIgIT09IHVuZGVmaW5lZCkgcmVzdWx0ID0gcjtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHJlc3VsdDtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIG5vIGJhc2VVUklcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcIm1haW5cIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5PLmogPSAoY2h1bmtJZCkgPT4gKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9PT0gMCk7XG5cbi8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xudmFyIHdlYnBhY2tKc29ucENhbGxiYWNrID0gKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uLCBkYXRhKSA9PiB7XG5cdHZhciBbY2h1bmtJZHMsIG1vcmVNb2R1bGVzLCBydW50aW1lXSA9IGRhdGE7XG5cdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuXHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcblx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMDtcblx0aWYoY2h1bmtJZHMuc29tZSgoaWQpID0+IChpbnN0YWxsZWRDaHVua3NbaWRdICE9PSAwKSkpIHtcblx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcblx0XHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG5cdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKHJ1bnRpbWUpIHZhciByZXN1bHQgPSBydW50aW1lKF9fd2VicGFja19yZXF1aXJlX18pO1xuXHR9XG5cdGlmKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKSBwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbihkYXRhKTtcblx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcblx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG5cdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0oKTtcblx0XHR9XG5cdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcblx0fVxuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHJlc3VsdCk7XG59XG5cbnZhciBjaHVua0xvYWRpbmdHbG9iYWwgPSBzZWxmW1wid2VicGFja0NodW5rd2ViY29yZVwiXSA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmt3ZWJjb3JlXCJdIHx8IFtdO1xuY2h1bmtMb2FkaW5nR2xvYmFsLmZvckVhY2god2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCAwKSk7XG5jaHVua0xvYWRpbmdHbG9iYWwucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2guYmluZChjaHVua0xvYWRpbmdHbG9iYWwpKTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGRlcGVuZHMgb24gb3RoZXIgbG9hZGVkIGNodW5rcyBhbmQgZXhlY3V0aW9uIG5lZWQgdG8gYmUgZGVsYXllZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8odW5kZWZpbmVkLCBbXCJ2ZW5kb3JcIixcImJvb3RzdHJhcFwiXSwgKCkgPT4gKF9fd2VicGFja19yZXF1aXJlX18oXCIuL3B1YmxpYy90cy9pbmRleC50c1wiKSkpXG5fX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKF9fd2VicGFja19leHBvcnRzX18pO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9