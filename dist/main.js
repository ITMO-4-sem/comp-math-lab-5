/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./scss/index.scss":
/*!*************************!*\
  !*** ./scss/index.scss ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./ts/calculations/FiniteDifferencesNewtonMethod.ts":
/*!**********************************************************!*\
  !*** ./ts/calculations/FiniteDifferencesNewtonMethod.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FiniteDifferencesNewtonMethod": () => (/* binding */ FiniteDifferencesNewtonMethod)
/* harmony export */ });
class FiniteDifferencesNewtonMethod {
    constructor() {
        this.xValues = [];
        this.yValues = [];
        this.n = 0;
        // private factorial(num: number) {
        //     let value = 1;
        //     for (let i = 2; i <= num; i++)
        //         value = value * i;
        //     return value;
        // }
    }
    calc(table, interpolationPoint) {
        this.xValues = table.getXValues();
        this.yValues = table.getYValues();
        this.n = table.size();
        const x = interpolationPoint;
        const h = (this.xValues[1] - this.xValues[0]);
        const finiteDifferences = this.calcFiniteDifferences(this.n)[0];
        let base = 1;
        let accum = 0;
        for (let i = 0; i < this.n; i++) {
            accum += finiteDifferences[i] * base;
            base *= (x - this.xValues[i]) / (h * (i + 1));
        }
        return accum;
    }
    calcFiniteDifferences(k) {
        const table = new Array();
        table.push(this.yValues);
        // Таблица изначально повернута относительно расчетной таблицы в презентации
        // на 90 градусов для более удобной работы с ней в программе.
        for (let j = 0; j < k; j++) { // not sure about  k + 1
            const tmpArr = new Array();
            for (let l = 0; l < k - j; l++) {
                tmpArr.push(table[j][l + 1] - table[j][l]);
            }
            table.push(tmpArr);
        }
        // Rotate the table 90 degrees
        const finiteDifferences = new Array();
        for (let j = 0; j < k + 1; j++) {
            const tmpArr = new Array();
            for (let l = 0; l < k - j + 1; l++) {
                tmpArr.push(table[l][j]);
            }
            finiteDifferences.push(tmpArr);
        }
        return finiteDifferences;
    }
}


/***/ }),

/***/ "./ts/calculations/LagrangeMethod.ts":
/*!*******************************************!*\
  !*** ./ts/calculations/LagrangeMethod.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LagrangeMethod": () => (/* binding */ LagrangeMethod)
/* harmony export */ });
class LagrangeMethod {
    getLatexExpression() {
        return 'no no no';
        // (x - 2) * (x - 8) / ( () * () )
    }
    calc(table, interpolationPoint) {
        const xValues = table.getXValues();
        const yValues = table.getYValues();
        const x = interpolationPoint;
        const n = table.size();
        let Lx = 0;
        for (let i = 0; i < n; i++) {
            let li = 1;
            for (let j = 0; j < n; j++) {
                if (i === j) {
                    continue;
                }
                li *= (x - xValues[j]) / (xValues[i] - xValues[j]);
            }
            Lx += yValues[i] * li;
        }
        return Lx;
    }
}


/***/ }),

/***/ "./ts/calculations/Table.ts":
/*!**********************************!*\
  !*** ./ts/calculations/Table.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Table": () => (/* binding */ Table)
/* harmony export */ });
class Table {
    /**
     *
     * @param {Array<number>} xValues
     * @param {Array<number>} yValues
     * @throws Error if xValues.length != yValues.length
     */
    constructor(xValues, yValues) {
        if (xValues.length != yValues.length) {
            throw new Error('xValues and yValues rows must be of the same length.');
        }
        this.xValues = xValues;
        this.yValues = yValues;
    }
    size() {
        return this.xValues.length;
    }
    getXValues() {
        return this.xValues;
    }
    getYValues() {
        return this.yValues;
    }
}


/***/ }),

/***/ "./ts/calculations/VariousDifferencesNewtonMethod.ts":
/*!***********************************************************!*\
  !*** ./ts/calculations/VariousDifferencesNewtonMethod.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VariousDifferencesNewtonMethod": () => (/* binding */ VariousDifferencesNewtonMethod)
/* harmony export */ });
/**
 * Метод Ньютона с разделенными разностями.
 */
class VariousDifferencesNewtonMethod {
    constructor() {
        this.xValues = [];
        this.yValues = [];
    }
    calc(table, interpolationPoint) {
        this.xValues = table.getXValues();
        this.yValues = table.getYValues();
        const n = table.size();
        const x = interpolationPoint;
        let result = 0;
        for (let i = 0; i < n; i++) {
            let base = 1;
            const indexes = [0];
            for (let j = 0; j < i; j++) {
                base *= (x - this.xValues[j]);
                indexes.push(j + 1);
            }
            result += base * this.func(indexes);
        }
        return result;
    }
    /**
     * Counts  f(xi, ..., xi+k).
     *
     * @param {number[]} indexes
     * @return {number}
     * @private
     */
    func(indexes) {
        const indexesLength = indexes.length;
        if (indexesLength === 1) {
            return this.yValues[indexes[0]];
        }
        else {
            return (this.func(indexes.slice(1, indexesLength)) - this.func(indexes.slice(0, indexesLength - 1)))
                / (this.xValues[indexes[indexesLength - 1]] - this.xValues[indexes[0]]);
        }
    }
}


/***/ }),

/***/ "./ts/index.ts":
/*!*********************!*\
  !*** ./ts/index.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scss_index_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @scss/index.scss */ "./scss/index.scss");
/* harmony import */ var plotly_js_dist__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! plotly.js-dist */ "../node_modules/plotly.js-dist/plotly.js");
/* harmony import */ var plotly_js_dist__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(plotly_js_dist__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ts_calculations_Table__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ts/calculations/Table */ "./ts/calculations/Table.ts");
/* harmony import */ var _ts_calculations_VariousDifferencesNewtonMethod__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ts/calculations/VariousDifferencesNewtonMethod */ "./ts/calculations/VariousDifferencesNewtonMethod.ts");
/* harmony import */ var _ts_calculations_FiniteDifferencesNewtonMethod__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ts/calculations/FiniteDifferencesNewtonMethod */ "./ts/calculations/FiniteDifferencesNewtonMethod.ts");
/* harmony import */ var _ts_calculations_LagrangeMethod__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ts/calculations/LagrangeMethod */ "./ts/calculations/LagrangeMethod.ts");
 // is necessary for connecting styles to index.html
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore





const table1 = new _ts_calculations_Table__WEBPACK_IMPORTED_MODULE_2__.Table(new Array(0.1, 0.2, 0.3, 0.4, 0.5), new Array(1.25, 2.38, 3.79, 5.44, 7.14));
const table2 = new _ts_calculations_Table__WEBPACK_IMPORTED_MODULE_2__.Table(new Array(0.15, 0.2, 0.33, 0.47, 0.62), new Array(1.25, 2.38, 3.79, 5.44, 7.14));
const tableA3 = new _ts_calculations_Table__WEBPACK_IMPORTED_MODULE_2__.Table(new Array(1.9, 4.12, 5.4), new Array(0.946, -0.83, -0.773));
const tableA8 = new _ts_calculations_Table__WEBPACK_IMPORTED_MODULE_2__.Table(new Array(0.3, 0.95, 1.18, 2.39, 3.3, 4, 5.3, 5.76), new Array(0.296, 0.813, 0.925, 0.683, -0.158, -0.757, -0.832, -0.5));
const tableA10 = new _ts_calculations_Table__WEBPACK_IMPORTED_MODULE_2__.Table(new Array(15, 0.8, 9.03, 4, 13.3, 2.2, 6.7, 11.8, 18.4, 21.2), new Array(0.65, 0.717, 0.385, -0.757, 0.67, 0.808, 0.405, -0.694, -0.435, 0.711));
const tableSQR = new _ts_calculations_Table__WEBPACK_IMPORTED_MODULE_2__.Table(new Array(1, 2, 3, 4, 5, 6), new Array(1, 4, 9, 16, 25, 36));
const tableA8Ravnoots = new _ts_calculations_Table__WEBPACK_IMPORTED_MODULE_2__.Table(new Array(1, 2, 3, 4, 5, 6, 7, 8), new Array(0.8414709848078965, 0.9092974268256817, 0.1411200080598672, -0.7568024953079282, -0.9589242746631385, -0.27941549819892586, 0.6569865987187891, 0.9893582466233818));
let str = '';
for (const l of tableA8Ravnoots.getXValues()) {
    str += Math.sin(l) + ', ';
}
console.log(str);
// **********
const table = tableA8Ravnoots;
// **********
const interpolationPoint = 3.2;
const xValues = table.getXValues();
const yValues = table.getYValues();
console.log('xValues = ', xValues);
console.log('yValues = ', yValues);
const min = Math.min(...xValues);
const max = Math.max(...xValues);
const lagrangeMethod = new _ts_calculations_LagrangeMethod__WEBPACK_IMPORTED_MODULE_5__.LagrangeMethod();
// const lagrangeMethodResult = lagrangeMethod.calc( table1 , interpolationPoint);
const finiteDifNewtonMethod = new _ts_calculations_FiniteDifferencesNewtonMethod__WEBPACK_IMPORTED_MODULE_4__.FiniteDifferencesNewtonMethod();
// const finiteDifNewtonMethodResult = finiteDifNewtonMethod.calc(table1, interpolationPoint);
const variousDifferencesNewtonMethod = new _ts_calculations_VariousDifferencesNewtonMethod__WEBPACK_IMPORTED_MODULE_3__.VariousDifferencesNewtonMethod();
// const variousDifferencesNewtonMethodResult = variousDifferencesNewtonMethod.calc(table1, interpolationPoint);
// ------------------
console.log('l:', lagrangeMethod.calc(table, interpolationPoint));
console.log('v:', variousDifferencesNewtonMethod.calc(table, interpolationPoint));
console.log('f:', finiteDifNewtonMethod.calc(table, interpolationPoint));
// ------------------
const plotXValues = new Array();
const lagrangeMethodYValues = new Array();
const variousDifferencesNewtonMethodYValues = new Array();
const finiteDifferencesNewtonMethodYValues = new Array();
const sinFunctionYValues = new Array();
const offset = 0.1;
const step = 0.05;
for (let i = min - offset; i < max + offset; i += step) {
    plotXValues.push(i);
    lagrangeMethodYValues.push(round(lagrangeMethod.calc(table, i)));
    variousDifferencesNewtonMethodYValues.push(round(variousDifferencesNewtonMethod.calc(table, i)));
    finiteDifferencesNewtonMethodYValues.push(round(finiteDifNewtonMethod.calc(table, i)));
    sinFunctionYValues.push(round(Math.sin(i)));
}
console.log('l y', lagrangeMethodYValues);
console.log('v y', variousDifferencesNewtonMethodYValues);
console.log('f y', finiteDifferencesNewtonMethodYValues);
const traceLagrangeMethod = {
    x: plotXValues,
    y: lagrangeMethodYValues,
    mode: 'lines',
    type: 'scatter',
    name: 'Инт-я Лагранжа'
};
const traceFiniteDifferencesNewtonMethod = {
    x: plotXValues,
    y: finiteDifferencesNewtonMethodYValues,
    mode: 'lines',
    type: 'scatter',
    name: 'Инт-я Ньютона с конечн. разн.'
};
const traceVariousDifferencesNewtonMethod = {
    x: plotXValues,
    y: variousDifferencesNewtonMethodYValues,
    mode: 'lines',
    type: 'scatter',
    name: 'Инт-я Ньютона с раздел. разн.'
};
const traceBasePoints = {
    x: xValues,
    y: yValues,
    mode: 'markers',
    type: 'scatter',
    name: 'Исх точки',
    marker: {
        color: 'rgb(255, 217, 102)',
        size: 12
    },
};
const traceSinFunction = {
    x: plotXValues,
    y: sinFunctionYValues,
    mode: 'lines',
    type: 'scatter',
    name: 'sin(x)'
};
// const trace3 = {
//     x: [1, 2, 3, 4],
//     y: [12, 9, 15, 12],
//     mode: 'lines+markers',
//     type: 'scatter'
// };
const data = [traceBasePoints, traceLagrangeMethod, traceFiniteDifferencesNewtonMethod, traceVariousDifferencesNewtonMethod, traceSinFunction];
const layout = {
    title: 'Интерполяция',
    // autosize: false,
    // width: 500,
    // height: 500,
    xaxis: {
        title: {
            text: 'x'
        }
    },
    yaxis: {
        title: {
            text: 'F(x)'
        }
    }
};
const options = {
    scrollZoom: true,
    displayModeBar: false,
    responsive: true
};
plotly_js_dist__WEBPACK_IMPORTED_MODULE_1___default().newPlot(document.querySelector('.plot'), data, layout, options);
// ApexCharts
// const options = {
//     series: [{
//         name: 'Points',
//         type: 'scatter',
//
//         //2.14, 2.15, 3.61, 4.93, 2.4, 2.7, 4.2, 5.4, 6.1, 8.3
//         data: [{
//             x: 1,
//             y: 2.14
//         }, {
//             x: 1.2,
//             y: 2.19
//         }, {
//             x: 1.8,
//             y: 2.43
//         }, {
//             x: 2.3,
//             y: 3.8
//         }, {
//             x: 2.6,
//             y: 4.14
//         }, {
//             x: 2.9,
//             y: 5.4
//         }, {
//             x: 3.2,
//             y: 5.8
//         }, {
//             x: 3.8,
//             y: 6.04
//         }, {
//             x: 4.55,
//             y: 6.77
//         }, {
//             x: 4.9,
//             y: 8.1
//         }, {
//             x: 5.1,
//             y: 9.4
//         }, {
//             x: 7.1,
//             y: 7.14
//         },{
//             x: 9.18,
//             y: 8.4
//         }]
//     }, {
//         name: 'Line',
//         type: 'line',
//         data: [{
//             x: 1,
//             y: 2
//         }, {
//             x: 2,
//             y: 4
//         }, {
//             x: 3,
//             y: 6
//         }, {
//             x: 4,
//             y: 8
//         }, {
//             x: 5,
//             y: 6
//         }, {
//             x: 6,
//             y: 7
//         }, {
//             x: 7,
//             y: 8
//         }, {
//             x: 8,
//             y: 9
//         }, {
//             x: 9,
//             y: 10
//         }, {
//             x: 10,
//             y: 11
//         }]
//     }],
//     stroke: {
//         curve: 'smooth'
//     },
//     chart: {
//         height: 350,
//         type: 'line',
//     },
//     fill: {
//         type:'solid',
//     },
//     markers: {
//         size: [6, 0]
//     },
//     tooltip: {
//         shared: false,
//         intersect: true,
//     },
//     legend: {
//         show: false
//     },
//     xaxis: {
//         type: 'numeric',
//         min: 0,
//         max: 12,
//         tickAmount: 12
//     }
// };
//
// const chart = new ApexCharts(document.querySelector(".plot"), options);
// chart.render();
const pt = 50;
function round(num, rounding) {
    let roundingg = 2;
    if (rounding) {
        roundingg = rounding;
    }
    return Number((num).toFixed(roundingg)); // 6.7
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
/******/ 					result = fn();
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
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
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
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
/******/ 			for(moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 				}
/******/ 			}
/******/ 			if(runtime) var result = runtime(__webpack_require__);
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkIds[i]] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = this["webpackChunk"] = this["webpackChunk"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_plotly_js-dist_plotly_js"], () => (__webpack_require__("./ts/index.ts")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=main.js.map