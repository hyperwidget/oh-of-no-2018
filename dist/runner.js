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
})({"utils/readFile.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.readFile = void 0;

var _fs = require("fs");

const readFile = day => {
  const dir = process.cwd();
  console.log(dir);
  return (0, _fs.readFileSync)(`${dir}/days/${day}/inputFile.txt`, {
    encoding: 'utf8'
  }).split('\n');
};

exports.readFile = readFile;
var _default = readFile;
exports.default = _default;
},{}],"days/day1/solution.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  a: input => {
    return input.reduce((tally, inputVal) => tally += eval(inputVal), 0);
  },
  b: inputs => {
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
};
exports.default = _default;
},{}],"days/day1/test.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
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
exports.default = _default;
},{}],"days/day1/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _solution = _interopRequireDefault(require("./solution"));

var _test = _interopRequireDefault(require("./test"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  solutions: _solution.default,
  tests: _test.default
};
exports.default = _default;
},{"./solution":"days/day1/solution.js","./test":"days/day1/test.js"}],"days/day2/solution.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  a: input => {
    let double = 0;
    let triple = 0;
    input.forEach(id => {
      let tracked = {};
      let doubleUsed = false;
      let tripleUsed = false;
      const splitVal = id.split('');
      splitVal.forEach(val => {
        if (tracked[val]) {
          tracked[val]++;
        } else {
          tracked[val] = 1;
        }
      });
      Object.keys(tracked).forEach(key => {
        if (!doubleUsed && tracked[key] === 2) {
          double++;
          doubleUsed = true;
        }

        if (!tripleUsed && tracked[key] === 3) {
          triple++;
          tripleUsed = true;
        }
      });
    });
    return double * triple;
  },
  b: input => {
    const splitValues = input.map(val => val.split(''));
    let retVal = null;
    splitValues.forEach(value => {
      splitValues.forEach(comparedAgainst => {
        let index = -1;
        let differences = 0;

        for (let i = 0; i < comparedAgainst.length && differences < 2; i++) {
          if (comparedAgainst[i] !== value[i]) {
            differences++;
            index = i;
          }
        }

        if (differences === 1) {
          retVal = comparedAgainst.slice(0, index).concat(comparedAgainst.slice(index + 1)).join('');
        }
      });
    });
    return retVal;
  }
};
exports.default = _default;
},{}],"days/day2/test.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  a: [{
    input: ['abcdef', 'bababc', 'abbcde', 'abcccd', 'aabcdd', 'abcdee', 'ababab'],
    expected: 12
  }],
  b: [{
    input: ['abcde', 'fghij', 'klmno', 'pqrst', 'fguij', 'axcye', 'wvxyz'],
    expected: 'fgij'
  }, {
    input: ['abcde', 'fghijasdfac', 'klmno', 'pqrst', 'fghijusdfac', 'axcye', 'wvxyz'],
    expected: 'fghijsdfac'
  }]
};
exports.default = _default;
},{}],"days/day2/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _solution = _interopRequireDefault(require("./solution"));

var _test = _interopRequireDefault(require("./test"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  solutions: _solution.default,
  tests: _test.default
};
exports.default = _default;
},{"./solution":"days/day2/solution.js","./test":"days/day2/test.js"}],"days/day3/solution.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  a: inputs => {
    const grid = Array(1000);

    for (let index = 0; index < grid.length; index++) {
      grid[index] = Array(1000).fill('.');
    }

    let count = 0;
    grid[1][1] = 'x';
    inputs.forEach(input => {
      const instruction = input.split(' ');
      const coords = instruction[2].replace(':', '').split(',');
      const size = instruction[3].split('x');

      for (let row = 0; row < size[0]; row++) {
        for (let column = 0; column < size[1]; column++) {
          const rowVal = parseInt(coords[0]) + row;
          const colVal = parseInt(coords[1]) + column;
          const gridValue = grid[rowVal][colVal];

          if (gridValue === '.') {
            grid[rowVal][colVal] = 1;
          } else if (gridValue === 1) {
            grid[rowVal][colVal] = 'x';
            count++;
          }
        }
      }
    });
    return count;
  },
  b: inputs => {
    const grid = Array(1000);

    for (let index = 0; index < grid.length; index++) {
      grid[index] = Array(1000).fill('.');
    }

    let retVal = null;
    grid[1][1] = 'x';
    inputs.forEach(input => {
      const instruction = input.split(' ');
      const coords = instruction[2].replace(':', '').split(',');
      const size = instruction[3].split('x');

      for (let row = 0; row < size[0]; row++) {
        for (let column = 0; column < size[1]; column++) {
          const rowVal = parseInt(coords[0]) + row;
          const colVal = parseInt(coords[1]) + column;
          const gridValue = grid[rowVal][colVal];

          if (gridValue === '.') {
            grid[rowVal][colVal] = 1;
          } else if (gridValue === 1) {
            grid[rowVal][colVal] = 'x';
          }
        }
      }
    });

    for (let index = inputs.length - 1; index > 0; index--) {
      const input = inputs[index];
      const instruction = input.split(' ');
      const coords = instruction[2].replace(':', '').split(',');
      const size = instruction[3].split('x');
      let overLapSize = 0;

      for (let row = 0; row < size[0]; row++) {
        for (let column = 0; column < size[1]; column++) {
          const rowVal = parseInt(coords[0]) + row;
          const colVal = parseInt(coords[1]) + column;
          const gridValue = grid[rowVal][colVal];

          if (gridValue === 'x') {
            overLapSize++;
          }
        }
      }

      if (overLapSize === 0) {
        retVal = instruction[0];
      }
    }

    return retVal;
  }
};
exports.default = _default;
},{}],"days/day3/test.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  a: [{
    input: [`#1 @ 1,3: 4x4`, `#2 @ 3,1: 4x4`, `#3 @ 5,5: 2x2`],
    expected: 4
  }],
  b: [{
    input: 1,
    expected: 1
  }, {
    input: 1,
    expected: 1
  }, {
    input: 1,
    expected: 1
  }, {
    input: 1,
    expected: 1
  }]
};
exports.default = _default;
},{}],"days/day3/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _solution = _interopRequireDefault(require("./solution"));

var _test = _interopRequireDefault(require("./test"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  solutions: _solution.default,
  tests: _test.default
};
exports.default = _default;
},{"./solution":"days/day3/solution.js","./test":"days/day3/test.js"}],"days/index.js":[function(require,module,exports) {
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
Object.defineProperty(exports, "day3", {
  enumerable: true,
  get: function () {
    return _day3.default;
  }
});

var _day = _interopRequireDefault(require("./day1"));

var _day2 = _interopRequireDefault(require("./day2"));

var _day3 = _interopRequireDefault(require("./day3"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./day1":"days/day1/index.js","./day2":"days/day2/index.js","./day3":"days/day3/index.js"}],"runner.js":[function(require,module,exports) {
"use strict";

var _readFile = require("./utils/readFile");

var days = _interopRequireWildcard(require("./days"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

const day = process.argv[2];
const part = process.argv[3];
const command = process.argv[4];
const dayCode = days[day];
console.log(`Running ${day} ${part} ${command}`);

if (command === 'test') {
  dayCode.tests[part].forEach((test, index) => {
    let errMessage = '';
    const result = dayCode.solutions[part](test.input);
    const expected = test.expected;
    const pass = result === expected;

    if (!pass) {
      errMessage = `Expected: ${expected} Got: ${result}`;
    }

    console.log(`Test ${index + 1}: ${pass ? 'Pass!' : 'Fail!'} ${errMessage}`);
  });
} else if (command === 'process') {
  const solution = dayCode.solutions[part];
  const result = solution((0, _readFile.readFile)(day));
  console.log(`Answer: ${result}`);
}
},{"./utils/readFile":"utils/readFile.js","./days":"days/index.js"}]},{},["runner.js"], null)
//# sourceMappingURL=/runner.map