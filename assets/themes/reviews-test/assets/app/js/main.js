/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/_components.js":
/*!*******************************!*\
  !*** ./src/js/_components.js ***!
  \*******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_reviews_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/reviews.js */ "./src/js/components/reviews.js");
/* harmony import */ var _components_filter_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/filter.js */ "./src/js/components/filter.js");



/***/ }),

/***/ "./src/js/components/filter.js":
/*!*************************************!*\
  !*** ./src/js/components/filter.js ***!
  \*************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _functions_loading_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../functions/loading.js */ "./src/js/functions/loading.js");

window.addEventListener("DOMContentLoaded", () => {
  const btnsSort = document.querySelectorAll(".sort-btn");
  const reviewsCards = document.querySelector(".reviews__cards");
  btnsSort.forEach(btn => {
    btn.addEventListener("click", e => {
      btnsSort.forEach(btnItem => {
        btnItem.classList.remove("active");
      });
      btn.classList.add("active");
      const value = btn.getAttribute("value");
      (0,_functions_loading_js__WEBPACK_IMPORTED_MODULE_0__.addLoading)(reviewsCards.parentElement);
      sort(value);
    });
  });
  async function sort(value) {
    const _domain = window.location.origin;
    const post_id = document.querySelector(".hide-field").getAttribute("value");
    try {
      const response = await fetch(`${_domain}/wp-admin/admin-ajax.php`, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/x-www-form-urlencoded"
        }),
        body: `action=sort_reviews&date=${value}&post_id=${post_id}`
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const res = await response.json();
      if (res) {
        (0,_functions_loading_js__WEBPACK_IMPORTED_MODULE_0__.hideLoading)(reviewsCards.parentElement);
        reviewsCards.innerHTML = res.result;
      } else {
        console.error("No results received");
        (0,_functions_loading_js__WEBPACK_IMPORTED_MODULE_0__.hideLoading)(reviewsCards.parentElement);
      }
    } catch (error) {
      console.error("Error:", error);
      (0,_functions_loading_js__WEBPACK_IMPORTED_MODULE_0__.hideLoading)(reviewsCards.parentElement);
    }
  }
});

/***/ }),

/***/ "./src/js/components/reviews.js":
/*!**************************************!*\
  !*** ./src/js/components/reviews.js ***!
  \**************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _functions_loading_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../functions/loading.js */ "./src/js/functions/loading.js");

window.addEventListener("DOMContentLoaded", function () {
  const reviewsBlock = document.querySelector(".reviews");
  if (reviewsBlock) {
    const form = reviewsBlock.querySelector(".form");
    const reviewsItems = reviewsBlock.querySelector(".reviews__items");
    const reviewsCards = reviewsBlock.querySelector(".reviews__cards");
    const filter = reviewsBlock.querySelector(".reviews__filter");
    const formResult = reviewsBlock.querySelector(".form__result");
    const formResultText = formResult.querySelector(".form__result-text");
    async function post(data) {
      const _domain = window.location.origin;
      try {
        const response = await fetch(`${_domain}/wp-admin/admin-ajax.php`, {
          method: "post",
          headers: new Headers({
            "Content-Type": "application/x-www-form-urlencoded"
          }),
          body: `action=set_reviews&data=${data}`
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        let res = await response.json();
        if (res) {
          (0,_functions_loading_js__WEBPACK_IMPORTED_MODULE_0__.hideLoading)(form);
          formResult.classList.remove("is-hidden");
          formResultText.textContent = res.data_name;
          reviewsCards.innerHTML = res.result + reviewsCards.innerHTML;
          if (reviewsCards.children.length > 1) {
            filter.classList.remove("is-hidden");
          }
          reviewsItems.classList.remove("is-hidden");
          formResultText.textContent = res.moderation_text;
          setTimeout(() => {
            formResult.classList.add("is-hidden");
          }, 2000);
        }
      } catch (error) {
        console.error("Error:", error);
        (0,_functions_loading_js__WEBPACK_IMPORTED_MODULE_0__.hideLoading)(form);
        formResult.classList.remove("is-hidden");
        formResultText.textContent = "Ошибка при отправке отзыва. Пожалуйста, попробуйте еще раз.";
        setTimeout(() => {
          formResult.classList.add("is-hidden");
        }, 2000);
      }
    }
    const validateForm = e => {
      e.preventDefault();
      const fields = e.target.querySelectorAll(".field");
      const data = {
        name: null,
        message: null
      };
      let isValid = true;
      fields.forEach(el => {
        const value = el.value.trim();
        if (!value) {
          el.classList.add("error");
          isValid = false;
        } else {
          const scriptTag = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/i;
          if (scriptTag.test(value)) {
            el.classList.add("error");
            isValid = false;
          } else {
            el.classList.remove("error");
            data[el.name] = value;
          }
        }
      });
      if (isValid) {
        (0,_functions_loading_js__WEBPACK_IMPORTED_MODULE_0__.addLoading)(e.target);
        post(JSON.stringify(data));
        e.target.reset();
      } else {
        console.log("error: form validation failed");
      }
    };
    form.addEventListener("submit", e => {
      validateForm(e);
    });
  }
});

/***/ }),

/***/ "./src/js/functions/loading.js":
/*!*************************************!*\
  !*** ./src/js/functions/loading.js ***!
  \*************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addLoading: () => (/* binding */ addLoading),
/* harmony export */   hideLoading: () => (/* binding */ hideLoading)
/* harmony export */ });
function addLoading(item) {
  if (item) {
    item.classList.add("loading");
  }
}
function hideLoading(item) {
  if (item) {
    item.classList.remove("loading");
  }
}

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
/************************************************************************/
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
/************************************************************************/
var __webpack_exports__ = {};
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_components.js */ "./src/js/_components.js");

/******/ })()
;
//# sourceMappingURL=main.js.map