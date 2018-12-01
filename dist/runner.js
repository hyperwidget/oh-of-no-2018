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
},{}],"solutions/day2.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.solution = void 0;
const solution = {
  a: {
    input: `Day1AInput`,
    solution: input => {
      return input;
    }
  },
  b: {
    input: `Day1BInput`,
    solution: input => {
      return input;
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
Object.defineProperty(exports, "day2", {
  enumerable: true,
  get: function () {
    return _day2.default;
  }
});

var _day = _interopRequireDefault(require("./day1"));

var _day2 = _interopRequireDefault(require("./day2"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./day1":"solutions/day1.js","./day2":"solutions/day2.js"}],"tests/day1.js":[function(require,module,exports) {
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
},{}],"tests/day2.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.tests = void 0;
const tests = {
  a: [{
    input: 1,
    expected: 2
  }, {
    input: 1,
    expected: 1
  }, {
    input: 1,
    expected: 3
  }, {
    input: 1,
    expected: 7
  }],
  b: [{
    input: 1,
    expected: 1
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
Object.defineProperty(exports, "day2", {
  enumerable: true,
  get: function () {
    return _day2.default;
  }
});

var _day = _interopRequireDefault(require("./day1"));

var _day2 = _interopRequireDefault(require("./day2"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./day1":"tests/day1.js","./day2":"tests/day2.js"}],"utils/readFile.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.readFile = void 0;

var _fs = require("fs");

const readFile = day => {
  const dir = process.cwd();
  console.log(dir);
  return (0, _fs.readFileSync)(`${dir}/inputFiles/${day}.txt`, {
    encoding: 'utf8'
  }).split('\n');
};

exports.readFile = readFile;
var _default = readFile;
exports.default = _default;
},{}],"runner.js":[function(require,module,exports) {
"use strict";

var solutions = _interopRequireWildcard(require("./solutions"));

var tests = _interopRequireWildcard(require("./tests"));

var _readFile = require("./utils/readFile");

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
  const result = solution.solution((0, _readFile.readFile)(day));
  console.log(`Answer: ${result}`);
}
},{"./solutions":"solutions/index.js","./tests":"tests/index.js","./utils/readFile":"utils/readFile.js"}]},{},["runner.js"], null)
//# sourceMappingURL=/runner.map