// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"solutions/day1.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.solution = void 0;
const providedInput = ['-19', '+8', '-10', '+9', '+2', '+19', '+5', '+8', '+13', '+16', '+4', '-8', '+16', '-10', '+11', '+13', '-12', '-5', '-15', '-12', '+9', '-6', '-18', '+5', '+3', '+18', '-3', '+5', '-19', '+21', '-9', '-9', '+20', '-18', '+11', '+11', '+17', '+17', '-20', '-7', '+5', '+7', '+7', '+7', '+7', '+16', '-12', '+18', '+10', '+3', '+15', '-10', '+8', '+5', '+7', '-16', '-16', '-2', '-15', '+3', '-6', '+9', '-15', '+19', '-12', '-20', '-1', '-12', '+11', '-22', '+10', '+15', '+2', '-10', '-19', '+1', '-18', '-21', '-4', '+16', '-15', '+13', '+20', '+7', '+23', '+13', '-3', '+10', '+8', '-7', '+4', '-19', '-7', '-4', '+19', '+20', '-18', '-5', '+11', '+22', '-14', '+15', '-3', '+16', '+20', '-16', '-11', '-12', '+7', '-13', '+7', '+12', '+20', '+9', '-15', '+1', '-14', '+11', '+16', '+13', '+9', '-16', '+18', '-8', '-6', '+17', '+7', '+15', '+7', '-15', '-15', '-14', '-16', '+15', '+17', '+19', '+6', '-16', '+13', '-12', '+20', '-18', '-11', '-8', '-14', '+18', '-11', '+6', '-16', '+14', '-10', '-6', '+1', '+16', '+4', '-6', '-8', '+27', '+18', '+10', '-3', '-2', '+11', '-10', '+11', '+7', '+19', '-1', '+11', '+14', '-16', '-10', '+15', '-9', '+2', '-1', '+13', '-4', '+6', '-9', '+10', '-2', '-10', '+17', '-14', '-10', '+15', '+17', '-12', '-15', '+18', '+8', '+13', '+3', '+17', '+14', '+1', '+15', '+18', '+7', '+15', '-2', '+9', '+3', '-1', '-18', '-15', '-11', '-10', '-1', '-14', '+13', '-18', '-2', '+5', '+5', '-7', '-5', '-12', '+4', '+19', '+15', '+9', '-17', '-10', '-5', '+13', '+15', '+7', '-10', '+12', '+1', '+9', '-18', '+14', '+20', '+2', '+5', '+7', '+6', '+13', '+4', '+12', '-9', '+17', '+10', '-5', '-9', '+18', '+4', '+5', '-16', '+1', '+16', '+1', '-5', '+19', '-5', '+14', '-15', '-3', '+7', '-15', '+14', '-7', '+16', '+13', '+1', '+17', '-4', '-9', '+12', '+15', '+10', '+5', '+8', '+31', '+22', '+12', '+16', '-17', '+9', '-21', '-13', '+22', '-1', '-2', '+17', '+14', '+34', '+18', '-15', '+10', '+14', '+11', '+4', '-9', '+13', '-12', '+7', '+3', '-15', '+6', '+5', '+21', '-18', '-20', '+7', '+18', '-11', '+8', '-9', '+11', '-19', '-2', '-2', '-20', '-13', '+16', '-14', '-1', '+4', '+20', '-10', '+6', '-18', '+15', '+41', '-1', '+25', '+21', '+15', '+1', '-14', '-1', '-11', '+17', '-9', '-5', '-1', '+21', '-2', '+9', '+3', '-13', '-16', '+1', '+13', '-4', '-18', '-8', '-20', '-1', '+2', '+1', '+4', '-8', '-46', '-29', '-16', '-5', '-36', '+35', '-144', '+3', '+2', '-7', '-1', '-11', '-20', '-22', '-12', '-18', '-2', '-18', '+8', '-18', '+3', '-1', '+7', '-18', '+7', '+19', '-12', '-19', '-19', '-14', '+15', '+15', '+6', '-17', '+12', '+11', '+24', '+16', '+4', '+12', '+4', '-18', '+3', '+19', '-10', '+12', '-4', '+19', '+3', '+2', '+5', '+19', '+5', '+22', '-21', '+1', '-21', '-19', '+13', '-12', '+10', '-12', '-13', '-2', '-11', '-16', '-7', '+10', '-21', '-3', '+4', '+22', '+18', '+11', '+1', '-10', '+15', '+5', '-9', '+2', '+1', '-24', '-1', '-2', '+6', '-26', '-15', '-16', '+9', '+25', '+14', '-7', '-27', '-24', '+16', '-30', '-30', '+26', '+12', '+3', '-32', '+3', '-10', '-4', '+8', '-19', '-7', '+15', '+13', '-3', '+16', '+7', '-21', '-23', '-12', '+14', '-149', '-77', '+19', '+6', '-80', '+11', '-16', '-19', '-65', '+6', '-67327', '-14', '+16', '-15', '-10', '+4', '+16', '-12', '-3', '-10', '+7', '+14', '-2', '+17', '+8', '-7', '+15', '-17', '-13', '-11', '-18', '+19', '-22', '-11', '-1', '-16', '-2', '+10', '-12', '-6', '+11', '+9', '+1', '+13', '+9', '-6', '+19', '-10', '-4', '-12', '+14', '+1', '+19', '+15', '+8', '-16', '+1', '+8', '+18', '-12', '-5', '+10', '+15', '-9', '-15', '+12', '+8', '-9', '+3', '+16', '+5', '+14', '+18', '-1', '-5', '+4', '+17', '+12', '-9', '-12', '-15', '+11', '-19', '+1', '-13', '+17', '-11', '-11', '-14', '+8', '+10', '-15', '+18', '-12', '+4', '-1', '+10', '+16', '+11', '+3', '-11', '-14', '-4', '+17', '+13', '+4', '+12', '-18', '-16', '-20', '+14', '-22', '-20', '-20', '+6', '+16', '-15', '-35', '-7', '-17', '-20', '+19', '-17', '-11', '-9', '-16', '-3', '+7', '-10', '-2', '+7', '+2', '+2', '+16', '+14', '+17', '-8', '-18', '+2', '-6', '+3', '-10', '-8', '+7', '+5', '+18', '-20', '-13', '-17', '-17', '-7', '+9', '+13', '-17', '+16', '+4', '+12', '-3', '+1', '-12', '-7', '+16', '+13', '+1', '+14', '-3', '-4', '+16', '-21', '-20', '-17', '+1', '-14', '-10', '-5', '-14', '-1', '-5', '+19', '+3', '+16', '-9', '-13', '+2', '+3', '-7', '-15', '+4', '+6', '+8', '-10', '+5', '+12', '+8', '+18', '-7', '+8', '-15', '+5', '-11', '-15', '+16', '+16', '+7', '-2', '+14', '+18', '+24', '+9', '+19', '+17', '+13', '-16', '-13', '-14', '-20', '-5', '+18', '-3', '+20', '+13', '+15', '+7', '+11', '-15', '-22', '-15', '-6', '+18', '-8', '+18', '-6', '-24', '-12', '+21', '+17', '+18', '+40', '+22', '+27', '-4', '-16', '+17', '-10', '-18', '+49', '+15', '-12', '+7', '+13', '-16', '+10', '+15', '-1', '-3', '+16', '+6', '-7', '+4', '-18', '+13', '-4', '-16', '+18', '-5', '+1', '+9', '-4', '-2', '+19', '+17', '-4', '-14', '-24', '-21', '+1', '+6', '-18', '+8', '+15', '-18', '-2', '-31', '-30', '+4', '+2', '-28', '-53', '-33', '+10', '-11', '-18', '-19', '-4', '-6', '-24', '-6', '-4', '+11', '-24', '-16', '+3', '-1', '-1', '+13', '-15', '-10', '-7', '-3', '+8', '-11', '+2', '+5', '+8', '-3', '-7', '+15', '+1', '-11', '-11', '-2', '-4', '+16', '+5', '+14', '-24', '-14', '-22', '-11', '-15', '-6', '+8', '+15', '+19', '-14', '-12', '+1', '+9', '+5', '+18', '+6', '-18', '+16', '-8', '-10', '-8', '-9', '+1', '+11', '-16', '+8', '+18', '+12', '+8', '+2', '+10', '+11', '-2', '+14', '+1', '+11', '-9', '-18', '-24', '+2', '-8', '+15', '-14', '-18', '+11', '+2', '-10', '-11', '-5', '-13', '-3', '-12', '-5', '-13', '+16', '+5', '-19', '-16', '-12', '-4', '+10', '-15', '+14', '-6', '+3', '-18', '+17', '+12', '-2', '+6', '+13', '+16', '-11', '+3', '+3', '-20', '-6', '+8', '-9', '-19', '-3', '+16', '-14', '-14', '+1', '-12', '-10', '+19', '-12', '-18', '+5', '-3', '+7', '-20', '-16', '-18', '+17', '-23', '+25', '+65', '+11', '+11', '+16', '-1', '+16', '-9', '+19', '+13', '-8', '-10', '+9', '-18', '-16', '-16', '-19', '+1', '-28', '+4', '+35', '+13', '+12', '+15', '-5', '-3', '+4', '+16', '+2', '+10', '+15', '+17', '+18', '+27', '+19', '+15', '+13', '+6', '-17', '+12', '+15', '+9', '+23', '+78', '-221', '-28', '+19', '+18', '-13', '-22', '-11', '-5', '-5', '-9', '-16', '-2', '+11', '+30', '+10', '+28', '-4', '-72', '-36', '+10', '-5', '+77', '+35', '+102', '+153', '-29', '-676', '-67225', '-5', '+13', '+19', '+3', '+15', '+7', '-11', '-1', '-7', '+13', '+17', '+17', '+6', '-15', '-9', '+11', '-8', '-7', '+10', '+1', '+13', '+19', '-11', '-11', '+2', '+4', '-11', '-7', '+10', '+19', '+17', '+7', '+12', '+20', '-2', '+135638'];
const solution = {
  a: {
    input: providedInput,
    solution: input => {
      return input.reduce((tally, inputVal) => tally += eval(inputVal), 0);
    }
  },
  b: {
    input: providedInput,
    solution: inputs => {
      let frequencies = {
        0: true
      };
      let foundDuplicate = false;
      let currentFrequency = 0;

      while (!foundDuplicate) {
        for (let index = 0; index < inputs.length && !foundDuplicate; index++) {
          currentFrequency += eval(inputs[index]);

          if (frequencies[currentFrequency]) {
            foundDuplicate = true;
          } else {
            frequencies[currentFrequency] = true;
          }
        }
      }

      return currentFrequency;
    }
  }
};
exports.solution = solution;
var _default = solution;
exports.default = _default;
},{}],"solutions/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "day1", {
  enumerable: true,
  get: function () {
    return _day.default;
  }
});

var _day = _interopRequireDefault(require("./day1"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./day1":"solutions/day1.js"}],"tests/day1.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.tests = void 0;
const tests = {
  a: [{
    input: [`+1`, `-2`, `+3`, `+1`],
    expected: 3
  }, {
    input: [`+1`, `+1`, `-2`],
    expected: 0
  }, {
    input: [`-1`, `-2`, `-3`],
    expected: -6
  }],
  b: [{
    input: [`+1`, `-1`],
    expected: 0
  }, {
    input: [`+3`, `+3`, `+4`, `-2`, `-4`],
    expected: 10
  }, {
    input: [`-6`, `+3`, `+8`, `+5`, `-6`],
    expected: 5
  }, {
    input: [`+7`, `+7`, `-2`, `-7`, `-4`],
    expected: 14
  }]
};
exports.tests = tests;
var _default = tests;
exports.default = _default;
},{}],"tests/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "day1", {
  enumerable: true,
  get: function () {
    return _day.default;
  }
});

var _day = _interopRequireDefault(require("./day1"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./day1":"tests/day1.js"}],"runner.js":[function(require,module,exports) {
"use strict";

var solutions = _interopRequireWildcard(require("./solutions"));

var tests = _interopRequireWildcard(require("./tests"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

const day = process.argv[2];
const part = process.argv[3];
const command = process.argv[4];
console.log(`Running ${day} ${part} ${command}`);

if (command === 'test') {
  tests[day][part].forEach((test, index) => {
    let errMessage = '';
    const result = solutions[day][part].solution(test.input);
    const pass = result === test.expected;

    if (!pass) {
      errMessage = `Expected: ${test.expected} Got: ${result}`;
    }

    console.log(`Test ${index + 1}: ${pass ? 'Pass!' : 'Fail!'} ${errMessage}`);
  });
} else if (command === 'process') {
  const solution = solutions[day][part];
  const result = solution.solution(solution.input);
  console.log(`Answer: ${result}`);
}
},{"./solutions":"solutions/index.js","./tests":"tests/index.js"}]},{},["runner.js"], null)
//# sourceMappingURL=/runner.map