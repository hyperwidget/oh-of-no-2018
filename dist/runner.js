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
    // Literally make a grid of 1000*1000 and fill it with dots
    const grid = Array(1000);

    for (let index = 0; index < grid.length; index++) {
      grid[index] = Array(1000).fill('.');
    }

    let count = 0;
    grid[1][1] = 'x'; // For every instruction, parse out into bits that are needed

    inputs.forEach(input => {
      const instruction = input.split(' ');
      const coords = instruction[2].replace(':', '').split(',');
      const size = instruction[3].split('x'); // Loop through each instruction and add a `1` in every square that should be placed
      // If an overlap happens, put an x and increase the count of overlaps

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
    }); // Return overlaps

    return count;
  },
  b: inputs => {
    // All this is exactly the same as part a
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
    }); // _THIS_ is just genious /s
    // This loops through all the instructions _backwards_ after having already
    // gone through the instructions in the original order
    // that way I don't need to worry about whether or not a future instruction
    // doesn't overlap with this one, because all the future instructions have been run already

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
    input: [`#1 @ 1,3: 4x4`, `#2 @ 3,1: 4x4`, `#3 @ 5,5: 2x2`],
    expected: 3
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
},{"./solution":"days/day3/solution.js","./test":"days/day3/test.js"}],"days/day4/solution.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _moment = _interopRequireWildcard(require("moment"));

var _lodash = require("lodash");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

// Just a default guard object witht the structure I want
const createGuard = id => {
  return {
    id,
    logs: {},
    totalAsleep: 0,
    mostAsleepMinute: 0
  };
}; // A fresh array with no minutes slept in


const createFreshLog = () => {
  return new Array(60).fill('.');
}; // Loops through the logs provided, compares them and finds the minute
// that occurs in the logs the most, returns a count and the minute itself


const getMostSleptMinute = logs => {
  let minutes = [];

  for (const key in logs) {
    if (logs.hasOwnProperty(key)) {
      const log = logs[key];
      let sleptMinutes = [];

      for (let i = 0; i < log.length; i++) {
        const time = log[i];

        if (time !== '.') {
          sleptMinutes.push(i);
        } else {}
      }

      minutes.push(sleptMinutes);
    }
  }

  const count = (0, _lodash.countBy)((0, _lodash.flatten)(minutes));
  const max = (0, _lodash.maxBy)(Object.keys(count), o => count[o]);
  return {
    count: count[max],
    minute: max
  };
};

const dateFormat = 'YYYY-MM-DD';

const getDate = input => _moment.default.utc(input).format(dateFormat);

var _default = {
  a: inputs => {
    // SORT INPUT
    inputs.sort((a, b) => {
      const alog = a.split(']');
      const aVal = new Date(alog[0].replace('[', ''));
      const blog = b.split(']');
      const bVal = new Date(blog[0].replace('[', ''));

      if (aVal < bVal) {
        return -1;
      }

      if (aVal > bVal) {
        return 1;
      }

      return 0;
    });
    const guards = {};
    let chosenGuard = null;
    let currentGuard = null;
    let lastMinute = 0; // Format input inot the way I chose to use it

    inputs.forEach(input => {
      const log = input.split(' ');
      const dateVal = new Date(log[0].replace('[', ''));
      const time = log[1].replace(']', '').split(':');
      const action = log[2];
      const id = log[3].replace('#', ''); // If the guard exists, we're dealing with sleeping or waking

      if (Number.isNaN(parseInt(id))) {
        const logId = getDate(dateVal); // If the guard falls alseep, we just need to keep track of when he fell asleep

        if (action === 'falls') {
          lastMinute = time[1];
        } else {
          // If the guard wakes up, we use the falls asleep time to update the logs with
          // his slept minutes as well as updates this guard's total Sleep time
          for (let i = lastMinute; i < time[1]; i++) {
            currentGuard.logs[logId][i] = 'x';
            currentGuard.totalAsleep++;
          }

          lastMinute = time[1];
        }
      } else {
        // If guard doesn't exist then set up new guard ++ logs
        if (!guards[id]) {
          guards[id] = createGuard(id);
        }

        currentGuard = guards[id]; // If the time's hour isn't midnight then set up the log for the following day
        // because we really don't care when the guard starts, just what day his shift is for

        if (time[0] !== '00') {
          dateVal.setDate(dateVal.getDate() + 1);
          currentGuard.logs[getDate(dateVal)] = createFreshLog();
        } else {
          currentGuard.logs[getDate(dateVal)] = createFreshLog();
        }

        lastMinute = 0;
      }
    }); // Get guard with most slept minutes

    for (const key in guards) {
      const guard = guards[key];

      if (!chosenGuard || guard.totalAsleep > chosenGuard.totalAsleep) {
        chosenGuard = guard;
      }
    } // Get minute most slept on


    const mostSleptMinute = getMostSleptMinute(chosenGuard.logs).minute;
    return chosenGuard.id * mostSleptMinute;
  },
  b: inputs => {
    // The same as part
    inputs.sort((a, b) => {
      const alog = a.split(']');
      const aVal = new Date(alog[0].replace('[', ''));
      const blog = b.split(']');
      const bVal = new Date(blog[0].replace('[', ''));

      if (aVal < bVal) {
        return -1;
      }

      if (aVal > bVal) {
        return 1;
      }

      return 0;
    });
    const guards = {};
    let chosenGuard = null;
    let currentGuard = null;
    let lastMinute = 0;
    inputs.forEach(input => {
      const log = input.split(' ');
      const dateVal = new Date(log[0].replace('[', ''));
      const time = log[1].replace(']', '').split(':');
      const action = log[2];
      const id = log[3].replace('#', '');

      if (Number.isNaN(parseInt(id))) {
        const logId = getDate(dateVal);

        if (action === 'falls') {
          lastMinute = time[1];
        } else {
          // Track total Sleep time
          for (let i = lastMinute; i < time[1]; i++) {
            currentGuard.logs[logId][i] = 'x';
            currentGuard.totalAsleep++;
          }

          lastMinute = time[1];
        }
      } else {
        // Set up log
        if (!guards[id]) {
          guards[id] = createGuard(id);
        }

        currentGuard = guards[id];

        if (time[0] !== '00') {
          dateVal.setDate(dateVal.getDate() + 1);
          currentGuard.logs[getDate(dateVal)] = createFreshLog();
        } else {
          currentGuard.logs[getDate(dateVal)] = createFreshLog();
        }

        lastMinute = 0;
      }
    }); // Loop through guards and figure out most slept minute and count for each

    for (const key in guards) {
      const guard = guards[key];
      const answer = getMostSleptMinute(guard.logs);
      guard.mostSleptMinute = answer.minute;
      guard.mostSleptMinuteCount = answer.count;
    } // Find guard with most slept minutes


    for (const key in guards) {
      const guard = guards[key];

      if (!chosenGuard || guard.mostSleptMinuteCount > chosenGuard.mostSleptMinuteCount) {
        if (guard.mostSleptMinuteCount) {
          chosenGuard = guard;
        }
      }
    }

    return chosenGuard.id * chosenGuard.mostSleptMinute;
  }
};
exports.default = _default;
},{}],"days/day4/test.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  a: [{
    input: [`[1518-11-01 00:00] Guard #10 begins shift`, `[1518-11-01 00:05] falls asleep`, `[1518-11-01 00:25] wakes up`, `[1518-11-01 00:30] falls asleep`, `[1518-11-01 00:55] wakes up`, `[1518-11-01 23:58] Guard #99 begins shift`, `[1518-11-02 00:40] falls asleep`, `[1518-11-02 00:50] wakes up`, `[1518-11-03 00:05] Guard #10 begins shift`, `[1518-11-03 00:24] falls asleep`, `[1518-11-03 00:29] wakes up`, `[1518-11-04 00:02] Guard #99 begins shift`, `[1518-11-04 00:36] falls asleep`, `[1518-11-04 00:46] wakes up`, `[1518-11-05 00:03] Guard #99 begins shift`, `[1518-11-05 00:45] falls asleep`, `[1518-11-05 00:55] wakes up`],
    expected: 240
  }],
  b: [{
    input: [`[1518-11-01 00:00] Guard #10 begins shift`, `[1518-11-01 00:05] falls asleep`, `[1518-11-01 00:25] wakes up`, `[1518-11-01 00:30] falls asleep`, `[1518-11-01 00:55] wakes up`, `[1518-11-01 23:58] Guard #99 begins shift`, `[1518-11-02 00:40] falls asleep`, `[1518-11-02 00:50] wakes up`, `[1518-11-03 00:05] Guard #10 begins shift`, `[1518-11-03 00:24] falls asleep`, `[1518-11-03 00:29] wakes up`, `[1518-11-04 00:02] Guard #99 begins shift`, `[1518-11-04 00:36] falls asleep`, `[1518-11-04 00:46] wakes up`, `[1518-11-05 00:03] Guard #99 begins shift`, `[1518-11-05 00:45] falls asleep`, `[1518-11-05 00:55] wakes up`],
    expected: 4455
  }]
};
exports.default = _default;
},{}],"days/day4/index.js":[function(require,module,exports) {
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
},{"./solution":"days/day4/solution.js","./test":"days/day4/test.js"}],"days/day5/solution.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const removeReactions = input => {
  let matchStart = false; // Loop through input from the start, if the next letter is the same letter
  // but opposite case then return the input minus those two indexes

  for (let i = 0; i < input.length - 1 && matchStart === false; i++) {
    const letter = input[i];
    const nextLetter = input[i + 1];

    if (letter === letter.toLowerCase() && letter.toUpperCase() === nextLetter || letter === letter.toUpperCase() && letter.toLowerCase() === nextLetter) {
      matchStart = i;
      break;
    }
  }

  if (matchStart !== false) {
    return input.slice(0, matchStart).concat(input.slice(matchStart + 2));
  } else {
    return input;
  }
};

var _default = {
  a: inputs => {
    const input = inputs[0];
    let done = false;
    let splitVals = input.split(''); // keep removing reactions until there are no more

    while (!done) {
      const startCount = splitVals.length;
      splitVals = removeReactions(splitVals); // No changes - ur done

      if (startCount === splitVals.length) {
        done = true;
      }
    }

    return splitVals.length;
  },
  b: inputs => {
    const input = inputs[0];
    let lowest = false; // For every letter in the alphabet, remove each case from the original string
    // Process as above for each, tracking the lowest amount of letters left

    for (let i = 0; i < 26; i++) {
      let done = false;
      const letter = (i + 10).toString(36);
      let splitVals = input.replace(new RegExp(letter, 'g'), '').replace(new RegExp(letter.toUpperCase(), 'g'), '').split('');

      while (!done) {
        const startCount = splitVals.length;
        splitVals = removeReactions(splitVals); // No changes - ur done

        if (startCount === splitVals.length) {
          done = true;
        }
      }

      if (lowest === false || splitVals.length < lowest) {
        lowest = splitVals.length;
      }
    }

    return lowest;
  }
};
exports.default = _default;
},{}],"days/day5/test.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  a: [{
    input: [`dabAcCaCBAcCcaDA`],
    expected: 10
  }, {
    input: [`dDbAcCaCBAcCcaDA`],
    expected: 8
  }, {
    input: [`DDbAcCaCBAcCcaDA`],
    expected: 10
  }],
  b: [{
    input: [`dabAcCaCBAcCcaDA`],
    expected: 4
  }, {
    input: [`dDbAcCaCBAcCcaDA`],
    expected: 8
  }, {
    input: [`DDbAcCaCBAcCcaDA`],
    expected: 10
  }]
};
exports.default = _default;
},{}],"days/day5/index.js":[function(require,module,exports) {
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
},{"./solution":"days/day5/solution.js","./test":"days/day5/test.js"}],"days/day6/solution.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = require("lodash");

const calcMan = (x1, x2, y1, y2) => Math.abs(x1 - x2) + Math.abs(y1 - y2);

var _default = {
  a: inputs => {
    const formattedInput = inputs.map(input => {
      const vals = input.split(',');
      return [parseInt(vals[0]), parseInt(vals[1])];
    });
    console.log(formattedInput); // find max size of grid to fill it

    let maxSize = (0, _lodash.max)((0, _lodash.flattenDeep)(formattedInput)) + 1; // create grid

    const grid = Array(maxSize);

    for (let i = 0; i < grid.length; i++) {
      grid[i] = Array(maxSize);
    } // add inputs to grid


    for (let i = 0; i < formattedInput.length; i++) {
      const input = formattedInput[i];
      grid[input[1]][input[0]] = i + 1 + '*';
    } // loop through each grid slot


    for (let row = 0; row < maxSize; row++) {
      for (let col = 0; col < maxSize; col++) {
        // If this isn't an input slot, don't track
        if (!grid[row][col]) {
          // track closest in grid slot
          let closest = maxSize;
          let closestInput = -1; // loop through each input and determine closest manhattan distance

          for (let i = 0; i < formattedInput.length; i++) {
            const man = calcMan(row, formattedInput[i][1], col, formattedInput[i][0]);

            if (man < closest) {
              closest = man;
              closestInput = i + 1;
            } // if same closeness to multiple - then `.`s
            else if (man === closest) {
                closestInput = '.';
              }
          }

          grid[row][col] = closestInput;
        }
      }
    } // count all occurances of a number in grid


    const valueCounts = (0, _lodash.countBy)((0, _lodash.flattenDeep)(grid)); // get values on outside of grid (they'll be infinite)

    const outerVals = [];

    for (let col = 0; col < maxSize; col++) {
      outerVals.push(grid[0][col]);
    }

    for (let col = 0; col < maxSize; col++) {
      outerVals.push(grid[maxSize - 1][col]);
    }

    for (let row = 0; row < maxSize; row++) {
      outerVals.push(grid[row][0]);
    }

    for (let row = 0; row < maxSize; row++) {
      outerVals.push(grid[row][maxSize - 1]);
    }

    const cleanOuterVals = (0, _lodash.uniq)(outerVals);
    const cleanOuterValsObject = {};

    for (let i = 0; i < cleanOuterVals.length; i++) {
      cleanOuterValsObject[cleanOuterVals[i]] = 0;
    }

    const cleanedVals = {}; // console.log(valueCounts)
    // remove outerVals from value counts

    for (const key in valueCounts) {
      if (valueCounts.hasOwnProperty(key)) {
        const element = valueCounts[key];

        if (cleanOuterValsObject[key] === undefined) {
          cleanedVals[key] = element;
        }
      }
    }

    const maxVal = (0, _lodash.maxBy)(Object.keys(cleanedVals), o => cleanedVals[o]);
    return cleanedVals[maxVal] + 1;
  },
  b: inputs => {
    let maxDistance = 0;
    const formattedInput = inputs.map(input => {
      const vals = input.split(',');
      return [parseInt(vals[0]), parseInt(vals[1])];
    });

    if (formattedInput.length === 6) {
      maxDistance = 32;
    } else {
      maxDistance = 10000;
    } // find max size of grid to fill it


    let maxSize = (0, _lodash.max)((0, _lodash.flattenDeep)(formattedInput)) + 1; // create grid

    const grid = Array(maxSize);

    for (let i = 0; i < grid.length; i++) {
      grid[i] = Array(maxSize);
    } // add inputs to grid


    for (let i = 0; i < formattedInput.length; i++) {
      const input = formattedInput[i];
      grid[input[1]][input[0]] = i + 1 + '*';
    } // loop through each grid slot


    for (let row = 0; row < maxSize; row++) {
      for (let col = 0; col < maxSize; col++) {
        // If this isn't an input slot, don't track
        // track closest in grid slot
        let totalMan = 0;
        let closestInput = -1; // loop through each input and track manhattan distance

        for (let i = 0; i < formattedInput.length; i++) {
          const man = calcMan(row, formattedInput[i][1], col, formattedInput[i][0]);
          totalMan += man;
        } // If value is less than target then hashtag it #blessed


        if (totalMan < maxDistance) {
          grid[row][col] = '#';
        } else {
          grid[row][col] = '.';
        }
      }
    } // count all occurances of '#'


    return (0, _lodash.countBy)((0, _lodash.flattenDeep)(grid))['#'];
  }
};
exports.default = _default;
},{}],"days/day6/test.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  a: [{
    input: [`1, 1`, `1, 6`, `8, 3`, `3, 4`, `5, 5`, `8, 9`],
    expected: 17
  }],
  b: [{
    input: [`1, 1`, `1, 6`, `8, 3`, `3, 4`, `5, 5`, `8, 9`],
    expected: 16
  }]
};
exports.default = _default;
},{}],"days/day6/index.js":[function(require,module,exports) {
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
},{"./solution":"days/day6/solution.js","./test":"days/day6/test.js"}],"days/day7/solution.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = require("lodash");

const processRequirementsMet = (stepsTaken, requirements) => {
  return (0, _lodash.difference)(requirements, stepsTaken).length === 0;
};

var _default = {
  a: inputs => {
    const steps = {}; // steps that are pointed to by another

    const targets = []; // holder of completed objects in order

    const path = [];
    let startingPoint = null; // For each instruction add an item to a steps object
    // each step tracks the requisite pre-steps
    // whether it can be processed
    // and whether it has already been processed

    inputs.forEach(input => {
      const splitInput = input.split(' ');
      const name = splitInput[1];
      const target = splitInput[7];

      if (!steps[name]) {
        steps[name] = {
          requires: [],
          processed: false,
          requirementsMet: false
        };
      }

      if (!steps[target]) {
        steps[target] = {
          requires: [],
          processed: false,
          requirementsMet: false
        };
      }

      steps[target].requires.push(name);
      targets.push(target);
    }); // Find the starting point by finding steps that aren't pointed to
    // by comparing the step ids with starting point and getting the first alphabetically
    // (in the event there's more than one)

    const keys = Object.keys(steps).sort();
    startingPoint = (0, _lodash.difference)(Object.keys(steps), targets).sort()[0]; // Add the starting point to the path and mark it as processed

    steps[startingPoint].processed = true;
    path.push(startingPoint); // Loop through keys, update their `requirementsMet`

    keys.forEach(key => {
      steps[key].requirementsMet = processRequirementsMet(path, steps[key].requires);
    }); // While there's still work to do, keep workin

    while (path.length < keys.length) {
      // Since we only process one step at a time, and processing that step can change
      // what step should be processed next; break if we've processed one
      let firstProcessed = false;

      for (let i = 0; i < keys.length && !firstProcessed; i++) {
        const key = keys[i];
        const step = steps[key];

        if (!step.processed) {
          if (step.requirementsMet) {
            path.push(key);
            steps[key].processed = true;
            firstProcessed = true;
          }
        }
      } // After processing a step, check each step to see if it's requirements are now met


      keys.forEach(key => {
        steps[key].requirementsMet = processRequirementsMet(path, steps[key].requires);
      });
    }

    return path.join(''); // SEFDGJLPKNRYOAMQIUHTCVWZXB - Wrong
    // Had an issue previously where I had the wrong starting point (because I didn't take into account multiple starting points; fixed by sorting)
  },
  b: inputs => {
    const steps = {}; // Variable const values depending on if testing or processing

    const workerCount = inputs.length === 7 ? 2 : 5;
    const delay = inputs.length === 7 ? 0 : 60;
    const targets = [];
    const path = [];
    const workers = []; // Track total elapsed time

    let totalTime = 0;
    let startingPoints = null; // Set up steps same as before

    inputs.forEach(input => {
      const splitInput = input.split(' ');
      const name = splitInput[1];
      const target = splitInput[7];

      if (!steps[name]) {
        steps[name] = {
          requires: [],
          processed: false,
          requirementsMet: false
        };
      }

      if (!steps[target]) {
        steps[target] = {
          requires: [],
          processed: false,
          requirementsMet: false
        };
      }

      steps[target].requires.push(name);
      targets.push(target);
    }); // Set up workers

    for (let i = 0; i < workerCount; i++) {
      workers.push({
        currentlyProcessing: null,
        availableAt: 0
      });
    } // Get starting points


    const keys = Object.keys(steps).sort();
    startingPoints = (0, _lodash.difference)(Object.keys(steps), targets).sort(); // Since we can have multiple starting points at once, start as many as you can

    startingPoints.forEach((point, index) => {
      workers[index].availableAt = delay + point.toLowerCase().charCodeAt(0) - 96;
      workers[index].processing = point;
    }); // Loop through keys, update their `requirementsMet`

    keys.forEach(key => {
      steps[key].requirementsMet = processRequirementsMet(path, steps[key].requires);
    }); // Workworkworkworkwork🎵

    while (path.length < keys.length) {
      // This is _basically_ a ticking clock at this point, where every loop is a new second
      let canBeProcessed = []; // If a step is done processing then add it to the path and mark as processed

      workers.forEach(worker => {
        if (worker.availableAt === totalTime && worker.processing) {
          path.push(worker.processing);
          steps[worker.processing].processed = true;
        }
      }); // Now that workers have maybe finished; check if requirements are met

      keys.forEach(key => {
        steps[key].requirementsMet = processRequirementsMet(path, steps[key].requires);
      }); // Find available steps by checking remaining steps' prereqs

      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const step = steps[key];

        if (!step.processed) {
          if (step.requirementsMet) {
            canBeProcessed.push(key);
          }
        }
      }

      let inProcess = []; // since the 'can be processed list' might also contain stuff already in process
      // find the stuff that's already in process and remove it from that list

      workers.forEach(worker => {
        if (worker.availableAt > totalTime && worker.processing) {
          inProcess.push(worker.processing);
        }
      });
      canBeProcessed = (0, _lodash.difference)(canBeProcessed, inProcess).sort(); // if worker is available then start working on process

      if (canBeProcessed.length > 0) {
        workers.forEach(worker => {
          if (worker.availableAt <= totalTime && canBeProcessed.length > 0) {
            const key = canBeProcessed.shift();
            worker.processing = key;
            worker.availableAt = totalTime + delay + key.toLowerCase().charCodeAt(0) - 96;
          }
        });
      } // Time keeps slippin


      totalTime++;
    }

    return totalTime - 1; // 1055 -- too high -- I only had 4 workers set up instead of 5. swear words
    // Thought about skipping to the next time that was > current time instead of ticking every second. didn't just cuz
  }
};
exports.default = _default;
},{}],"days/day7/test.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  a: [{
    input: [`Step C must be finished before step A can begin.`, `Step C must be finished before step F can begin.`, `Step A must be finished before step B can begin.`, `Step A must be finished before step D can begin.`, `Step B must be finished before step E can begin.`, `Step D must be finished before step E can begin.`, `Step F must be finished before step E can begin.`],
    expected: `CABDFE`
  }],
  b: [{
    input: [`Step C must be finished before step A can begin.`, `Step C must be finished before step F can begin.`, `Step A must be finished before step B can begin.`, `Step A must be finished before step D can begin.`, `Step B must be finished before step E can begin.`, `Step D must be finished before step E can begin.`, `Step F must be finished before step E can begin.`],
    expected: 15
  }]
};
exports.default = _default;
},{}],"days/day7/index.js":[function(require,module,exports) {
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
},{"./solution":"days/day7/solution.js","./test":"days/day7/test.js"}],"days/day8/solution.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const processNode = (inputs, cursor, total) => {
  // Get child and meta count, increase cursor position by 2
  const childrenCount = inputs[cursor];
  const metaCount = inputs[cursor + 1];
  let newCursor = cursor + 2;
  let nodeTotal = 0; // process children by calling this same function
  // getting back a new cursor position from where it's done processing
  // and that node's total

  for (let i = 0; i < childrenCount; i++) {
    const response = processNode(inputs, newCursor, total);
    nodeTotal += response.total;
    newCursor = response.cursor;
  } // get the meta values for this node


  for (let i = 0; i < metaCount; i++) {
    nodeTotal += parseInt(inputs[newCursor]);
    newCursor++;
  }

  return {
    total: nodeTotal + total,
    cursor: newCursor
  };
};

const processNode2 = (inputs, cursor, total, index) => {
  const childrenCount = inputs[cursor];
  const metaCount = inputs[cursor + 1];
  const children = [];
  let newCursor = cursor + 2;
  let nodeTotal = 0;

  for (let i = 0; i < childrenCount; i++) {
    const response = processNode2(inputs, newCursor, total, index + 1);
    newCursor = response.cursor;
    children.push(response);
  } // If this node has no children, then proces node as in parta


  if (parseInt(childrenCount) === 0) {
    for (let i = 0; i < metaCount; i++) {
      nodeTotal += parseInt(inputs[newCursor]);
      newCursor++;
    }

    return {
      total: nodeTotal,
      cursor: newCursor,
      children: []
    };
  } else {
    // Other wise get values of meta data by node's children's indexes
    for (let i = 0; i < metaCount; i++) {
      const metaIdx = parseInt(inputs[newCursor]) - 1;

      if (metaIdx + 1 <= children.length) {
        nodeTotal += children[metaIdx].total;
      }

      newCursor++;
    }
  }

  return {
    total: nodeTotal,
    cursor: newCursor,
    children
  };
};

var _default = {
  a: input => {
    const inputs = input[0].split(' '); // RECURSE!

    const metaDataTotal = processNode(inputs, 0, 0, 1);
    return metaDataTotal.total;
  },
  b: input => {
    const inputs = input[0].split(' '); // RECURSE!

    const metaDataTotal = processNode2(inputs, 0, 0);
    return metaDataTotal.total; // 318 too low
    // 0 - wrong 🙃
    // Fumbled around, discovered that I was misunderstanding
    // and was nuking the total of a node if any of it's children were empty
  }
};
exports.default = _default;
},{}],"days/day8/test.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  a: [{
    input: [`2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2`],
    expected: 138
  }],
  b: [{
    input: [`2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2`],
    expected: 66
  }]
};
exports.default = _default;
},{}],"days/day8/index.js":[function(require,module,exports) {
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
},{"./solution":"days/day8/solution.js","./test":"days/day8/test.js"}],"days/day9/solution.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = require("lodash");

const process = (input, multiplier = 1) => {
  const splitted = input[0].split(' ');
  const playerCount = parseInt(splitted[0]);
  const lastMarbleValue = parseInt(splitted[6]) * multiplier;
  const scores = {};
  let currentPlay = {
    value: 0
  };
  currentPlay.previous = currentPlay;
  currentPlay.next = currentPlay;

  for (let i = 1; i < lastMarbleValue + 1; i++) {
    if (i % 23 !== 0) {
      const newPlay = {
        value: i,
        previous: currentPlay.next,
        next: currentPlay.next.next
      };
      currentPlay.next.next.previous = newPlay;
      currentPlay.next.next = newPlay;
      currentPlay = newPlay;
    } else {
      const currentPlayer = i % playerCount;
      if (!scores[currentPlayer]) scores[currentPlayer] = 0;
      const replayce = currentPlay.previous.previous.previous.previous.previous.previous.previous;
      scores[currentPlayer] += replayce.value + i;
      replayce.previous.next = replayce.next;
      replayce.next.previous = replayce.previous;
      currentPlay = replayce.next;
    }
  }

  console.log();
  return Object.values(scores).sort().reverse()[0];
};

var _default = {
  a: input => process(input),
  b: input => process(input, 100)
};
exports.default = _default;
},{}],"days/day9/test.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  a: [{
    input: [`9 players; last marble is worth 25 points`],
    expected: 32
  }, {
    input: [`10 players; last marble is worth 1618 points`],
    expected: 8317
  }, {
    input: [`13 players; last marble is worth 7999 points`],
    expected: 146373
  }, {
    input: [`17 players; last marble is worth 1104 points`],
    expected: 2764
  }, {
    input: [`21 players; last marble is worth 6111 points`],
    expected: 54718
  }, {
    input: [`30 players; last marble is worth 5807 points`],
    expected: 37305
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
},{}],"days/day9/index.js":[function(require,module,exports) {
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
},{"./solution":"days/day9/solution.js","./test":"days/day9/test.js"}],"days/day10/solution.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.process = void 0;

var _lodash = require("lodash");

const process = inputs => {
  const points = [];
  inputs.forEach(input => {
    const splitted = input.replace("position=<", "").replace("velocity=", "").split("> ");
    const position = splitted[0].split(", ");
    const velocity = splitted[1].replace("<", "").replace(">", "").split(", ");
    const point = {
      startingPosition: [parseInt(position[0]), parseInt(position[1])],
      position: [parseInt(position[0]), parseInt(position[1])],
      velocity: [parseInt(velocity[0]), parseInt(velocity[1])]
    };
    points.push(point);
  });
  let isGrowing = false;
  let lastLength = 999999;
  let lastPoints = [];
  let count = 0;
  let grid = [];

  while (!isGrowing) {
    const lowestX = points.reduce((lowest, point) => point.position[0] < lowest ? point.position[0] : lowest, 99999);
    const highestX = points.reduce((highest, point) => point.position[0] > highest ? point.position[0] : highest, 0);
    const lowestY = points.reduce((lowest, point) => point.position[1] < lowest ? point.position[1] : lowest, 99999);
    const highestY = points.reduce((highest, point) => point.position[1] > highest ? point.position[1] : highest, 0);
    const gridXSize = highestX - lowestX;
    const gridYSize = highestY - lowestY;

    if (gridYSize > lastLength) {
      isGrowing = true;
      grid = Array(gridXSize + 1).fill([]);
      grid = Array(gridYSize).fill([]);

      for (let i = 0; i < grid.length; i++) {
        grid[i] = Array(gridXSize).fill(" ");
      }

      lastPoints.forEach(point => {
        let x = 0;
        let y = 0;
        x = point.position[0] - lowestX;
        y = point.position[1] - lowestY;
        grid[y][x] = "x";
      });
    } else {
      lastLength = gridYSize;
      lastPoints = (0, _lodash.cloneDeep)(points);
    }

    points.forEach(point => {
      point.position[0] += point.velocity[0];
      point.position[1] += point.velocity[1];
    });
    count++;
  }

  console.table(grid);
  return count - 2;
};

exports.process = process;
var _default = {
  a: process,
  b: process
};
exports.default = _default;
},{}],"days/day10/test.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  a: [{
    input: [`position=< 9,  1> velocity=< 0,  2>`, `position=< 7,  0> velocity=<-1,  0>`, `position=< 3, -2> velocity=<-1,  1>`, `position=< 6, 10> velocity=<-2, -1>`, `position=< 2, -4> velocity=< 2,  2>`, `position=<-6, 10> velocity=< 2, -2>`, `position=< 1,  8> velocity=< 1, -1>`, `position=< 1,  7> velocity=< 1,  0>`, `position=<-3, 11> velocity=< 1, -2>`, `position=< 7,  6> velocity=<-1, -1>`, `position=<-2,  3> velocity=< 1,  0>`, `position=<-4,  3> velocity=< 2,  0>`, `position=<10, -3> velocity=<-1,  1>`, `position=< 5, 11> velocity=< 1, -2>`, `position=< 4,  7> velocity=< 0, -1>`, `position=< 8, -2> velocity=< 0,  1>`, `position=<15,  0> velocity=<-2,  0>`, `position=< 1,  6> velocity=< 1,  0>`, `position=< 8,  9> velocity=< 0, -1>`, `position=< 3,  3> velocity=<-1,  1>`, `position=< 0,  5> velocity=< 0, -1>`, `position=<-2,  2> velocity=< 2,  0>`, `position=< 5, -2> velocity=< 1,  2>`, `position=< 1,  4> velocity=< 2,  1>`, `position=<-2,  7> velocity=< 2, -2>`, `position=< 3,  6> velocity=<-1, -1>`, `position=< 5,  0> velocity=< 1,  0>`, `position=<-6,  0> velocity=< 2,  0>`, `position=< 5,  9> velocity=< 1, -2>`, `position=<14,  7> velocity=<-2,  0>`, `position=<-3,  6> velocity=< 2, -1>`],
    expected: `HI`
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
},{}],"days/day10/index.js":[function(require,module,exports) {
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
},{"./solution":"days/day10/solution.js","./test":"days/day10/test.js"}],"days/day11/solution.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  a: input => {
    const serial = parseInt(input[0]);
    const grid = [];

    for (let i = 0; i <= 300; i++) {
      grid[i] = [];
    }

    for (let row = 1; row <= 300; row++) {
      for (let col = 1; col <= 300; col++) {
        const rackId = row + 10;
        let powerLevel = rackId * col + serial;
        powerLevel *= rackId;
        const stringified = powerLevel.toString().split('');
        const hundreds = stringified[stringified.length - 3];
        let val = parseInt(hundreds) - 5;
        grid[row - 1][col - 1] = val;
      }
    }

    let highestIndex = [];
    let highestIndexValue = 0;

    for (let row = 0; row < 300; row += 2) {
      for (let col = 0; col < 300;) {
        const startingPoint = [row + 1, col + 1];
        let sum = 0;

        for (let i = row; i < row + 3; i++) {
          for (let j = col; j < col + 3; j++) {
            sum += grid[i][j];
          }
        }

        if (sum > highestIndexValue) {
          highestIndexValue = sum;
          highestIndex = startingPoint;
        }

        col += 2;
      }
    }

    console.log(highestIndex, highestIndexValue);
    return input;
  },
  b: input => {
    const serial = parseInt(input[0]);
    const grid = [];

    for (let i = 0; i <= 300; i++) {
      grid[i] = [];
    }

    for (let row = 1; row <= 300; row++) {
      for (let col = 1; col <= 300; col++) {
        const rackId = row + 10;
        let powerLevel = rackId * col + serial;
        powerLevel *= rackId;
        const stringified = powerLevel.toString().split('');
        const hundreds = stringified[stringified.length - 3];
        let val = parseInt(hundreds) - 5;
        grid[row - 1][col - 1] = val;
      }
    }

    let highestIndex = [];
    let highestIndexValue = 0;
    let highestGridSize = 0;

    for (let gridSize = 1; gridSize <= 300; gridSize++) {
      console.log('checking grid', gridSize);

      for (let row = 0; row < 300 && row + gridSize < 300; row++) {
        for (let col = 0; col < 300 && col + gridSize < 300; col++) {
          const startingPoint = [row + 1, col + 1];
          let sum = 0;

          for (let i = row; i < row + gridSize; i++) {
            for (let j = col; j < col + gridSize; j++) {
              sum += grid[i][j];
              TotalCounted++;
            }
          }

          if (sum > highestIndexValue) {
            highestIndexValue = sum;
            highestIndex = startingPoint;
            highestGridSize = gridSize;
          }
        }
      }
    }

    console.log(highestIndex, highestIndexValue, highestGridSize);
    return input;
  }
};
exports.default = _default;
},{}],"days/day11/test.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  a: [// { input: ['8'], expected: 4 },
  // { input: ['57'], expected: -5 }
  // { input: ['39'], expected: 0 }
  // { input: ['71'], expected: 4 }
  // { input: ['18'], expected: '33,45' }
  {
    input: ['42'],
    expected: '21,61'
  }],
  b: [// { input: ['18'], expected: '33,45' }
  {
    input: ['42'],
    expected: '21,61'
  }]
};
exports.default = _default;
},{}],"days/day11/index.js":[function(require,module,exports) {
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
},{"./solution":"days/day11/solution.js","./test":"days/day11/test.js"}],"days/day12/solution.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const getIndicesOf = (searchStr, str) => {
  var searchStrLen = searchStr.length;

  if (searchStrLen == 0) {
    return [];
  }

  var startIndex = 0,
      index,
      indices = [];

  while ((index = str.indexOf(searchStr, startIndex)) > -1) {
    indices.push(index);
    startIndex = index + 1;
  }

  return indices;
};

var _default = {
  a: inputs => {
    let generation = 0;
    const instructions = {};
    const historicStates = [];
    let currentZeroIndex = 0;
    let state = '....' + inputs.shift() + '....';
    inputs.shift();
    currentZeroIndex += 4;
    inputs.forEach((input, index) => {
      const val = input.replace(' =>', '').split(' ');
      instructions[index] = {
        value: val[0],
        result: val[1]
      };
    });

    for (let i = 0; i < 20; i++) {
      let newState = '';

      if (inputs.length === 14) {
        newState = '.'.repeat(state.length);
      } else {
        newState = state;
      }

      for (const key in instructions) {
        const instruction = instructions[key];
        const indices = getIndicesOf(instruction.value, state);

        if (indices.length > 0) {
          indices.forEach(index => {
            newState = newState.substr(0, index + 2) + instruction.result + newState.substr(index + 3);
          });
        }

        const length = newState.length;

        if (Math.max(...indices) + 5 >= length && (newState[length - 1] === '#' || newState[length - 2] === '#' || newState[length - 3] === '#' || newState[length - 4] === '#' || newState[length - 5] === '#')) {
          newState = newState + '....';
        }

        if (Math.min(...indices) < 2 && newState[0] === '#' || newState[1] === '#') {
          console.log('ADDING');
          newState = '..' + newState;
          currentZeroIndex += 2;
        }
      }

      state = newState;
      historicStates.push(state);
    }

    const indexesOfPlants = getIndicesOf('#', state);
    const potSum = indexesOfPlants.reduce((total, pot) => pot - currentZeroIndex + total, 0);
    return potSum;
  },
  b: inputs => {
    console.log('test');
    let generation = 0;
    const instructions = {};
    const historicStates = [];
    let currentZeroIndex = 0;
    let potSum = 0;
    let lastDiff = 0;
    let state = '....' + inputs.shift() + '....';
    inputs.shift();
    currentZeroIndex += 4;
    inputs.forEach((input, index) => {
      const val = input.replace(' =>', '').split(' ');
      instructions[index] = {
        value: val[0],
        result: val[1]
      };
    });

    for (let i = 0; i < 1000; i++) {
      let newState = '';

      if (inputs.length === 14) {
        newState = '.'.repeat(state.length);
      } else {
        newState = state;
      }

      for (const key in instructions) {
        const instruction = instructions[key];
        const indices = getIndicesOf(instruction.value, state);

        if (indices.length > 0) {
          indices.forEach(index => {
            newState = newState.substr(0, index + 2) + instruction.result + newState.substr(index + 3);
          });
        }

        const length = newState.length;

        if (Math.max(...indices) + 5 >= length && (newState[length - 1] === '#' || newState[length - 2] === '#' || newState[length - 3] === '#' || newState[length - 4] === '#' || newState[length - 5] === '#')) {
          newState = newState + '....';
        }

        if (Math.min(...indices) < 2 && newState[0] === '#' || newState[1] === '#') {
          newState = '..' + newState;
          currentZeroIndex += 2;
        }
      }

      state = newState;
      historicStates.push(state);
      const indexesOfPlants = getIndicesOf('#', state);
      const currentSum = indexesOfPlants.reduce((total, pot) => pot - currentZeroIndex + total, 0);
      lastDiff = currentSum - potSum;
      potSum = currentSum;
    }

    const total = potSum + (50000000000 - 1000) * lastDiff;
    return total; // 299649998214115 - too high
    // 2996499994036 - too high
    // 2649999996115 - wrong
    // 2649999996062 - also wrong
    // 63679500 - too low
  }
};
exports.default = _default;
},{}],"days/day12/test.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  a: [{
    input: ['#..#.#..##......###...###', '', '...## => #', '..#.. => #', '.#... => #', '.#.#. => #', '.#.## => #', '.##.. => #', '.#### => #', '#.#.# => #', '#.### => #', '##.#. => #', '##.## => #', '###.. => #', '###.# => #', '####. => #'],
    expected: 325
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
},{}],"days/day12/index.js":[function(require,module,exports) {
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
},{"./solution":"days/day12/solution.js","./test":"days/day12/test.js"}],"days/day13/solution.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = require("lodash");

const getSortedCartIds = carts => {
  const cars = [];

  for (const key in carts) {
    cars.push({
      key,
      row: carts[key].currentPosition[0],
      col: carts[key].currentPosition[1]
    });
  }

  return (0, _lodash.sortBy)(cars, c => [c.row, c.col]);
};

var _default = {
  a: inputs => {
    const grid = [];
    const cars = {};
    let carCounter = 1;
    let moveCounter = 0;
    let crash = false; // Set initial Everything

    inputs.forEach(input => {
      grid.push(input.split(''));
    });

    for (let row = 0; row < grid.length - 1; row++) {
      for (let col = 0; col < grid[row].length - 1; col++) {
        let cell = grid[row][col];

        if (cell === 'v' || cell == '^' || cell == '>' || cell == '<') {
          cars[carCounter] = {
            currentPosition: [row, col],
            currentSymbol: cell,
            lastIntersectionDirection: 'right'
          };
          carCounter++;

          if (cell === 'v' || cell == '^') {
            grid[row][col] = '|';
          } else {
            grid[row][col] = '-';
          }
        }
      }
    }

    while (!crash) {
      const carOrder = getSortedCartIds(cars);
      const activeCoords = [];
      carOrder.forEach(sortedCar => {
        const currentCar = cars[sortedCar.key];

        switch (currentCar.currentSymbol) {
          case '^':
            currentCar.currentPosition[0] = currentCar.currentPosition[0] - 1;
            break;

          case 'v':
            currentCar.currentPosition[0] = currentCar.currentPosition[0] + 1;
            break;

          case '<':
            currentCar.currentPosition[1] = currentCar.currentPosition[1] - 1;
            break;

          case '>':
            currentCar.currentPosition[1] = currentCar.currentPosition[1] + 1;
            break;

          default:
            break;
        }

        const currentPos = currentCar.currentPosition.join(',');

        if (activeCoords.indexOf(currentPos) > -1) {
          console.log('KABLAM 😭');
          crash = currentPos;
          return currentPos; // return not being respected?
        } // because icky return


        if (!crash) {
          activeCoords.push(currentPos);
          const cellValue = grid[currentCar.currentPosition[0]][currentCar.currentPosition[1]];

          switch (cellValue) {
            case '\\':
              switch (currentCar.currentSymbol) {
                case '^':
                  currentCar.currentSymbol = '<';
                  break;

                case 'v':
                  currentCar.currentSymbol = '>';
                  break;

                case '<':
                  currentCar.currentSymbol = '^';
                  break;

                case '>':
                  currentCar.currentSymbol = 'v';
                  break;

                default:
                  break;
              }

              break;

            case '/':
              switch (currentCar.currentSymbol) {
                case '^':
                  currentCar.currentSymbol = '>';
                  break;

                case 'v':
                  currentCar.currentSymbol = '<';
                  break;

                case '<':
                  currentCar.currentSymbol = 'v';
                  break;

                case '>':
                  currentCar.currentSymbol = '^';
                  break;

                default:
                  break;
              }

              break;

            case '+':
              switch (currentCar.lastIntersectionDirection) {
                case 'left':
                  currentCar.lastIntersectionDirection = 'straight';
                  break;

                case 'straight':
                  switch (currentCar.currentSymbol) {
                    case '^':
                      currentCar.currentSymbol = '>';
                      break;

                    case 'v':
                      currentCar.currentSymbol = '<';
                      break;

                    case '<':
                      currentCar.currentSymbol = '^';
                      break;

                    case '>':
                      currentCar.currentSymbol = 'v';
                      break;

                    default:
                      break;
                  }

                  currentCar.lastIntersectionDirection = 'right';
                  break;

                case 'right':
                  switch (currentCar.currentSymbol) {
                    case '^':
                      currentCar.currentSymbol = '<';
                      break;

                    case 'v':
                      currentCar.currentSymbol = '>';
                      break;

                    case '<':
                      currentCar.currentSymbol = 'v';
                      break;

                    case '>':
                      currentCar.currentSymbol = '^';
                      break;

                    default:
                      break;
                  }

                  currentCar.lastIntersectionDirection = 'left';
                  break;

                default:
                  break;
              }

              break;

            default:
              break;
          }
        }
      });
      moveCounter++;
    } // reverse the answer because reasons


    return crash;
  },
  b: inputs => {
    const grid = [];
    const cars = {};
    let carCounter = 1;
    let moveCounter = 0;
    let crash = false;
    let remainingCarCount = 20; // Set initial Everything

    inputs.forEach(input => {
      grid.push(input.split(''));
    });

    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[row].length; col++) {
        let cell = grid[row][col];

        if (cell === 'v' || cell == '^' || cell == '>' || cell == '<') {
          cars[carCounter] = {
            currentPosition: [row, col],
            currentSymbol: cell,
            lastIntersectionDirection: 'right'
          };
          carCounter++;

          if (cell === 'v' || cell == '^') {
            grid[row][col] = '|';
          } else {
            grid[row][col] = '-';
          }
        }
      }
    }

    while (remainingCarCount > 1) {
      const carOrder = getSortedCartIds(cars);
      const movedCars = [];

      for (let i = 0; i < carOrder.length - 1; i++) {
        if (cars[carOrder[i].key].currentPosition[0] === cars[carOrder[i + 1].key].currentPosition[0] && cars[carOrder[i].key].currentPosition[1] === cars[carOrder[i + 1].key].currentPosition[1] - 1) {}
      }

      carOrder.forEach(sortedCar => {
        let crash = false;
        const currentCar = cars[sortedCar.key];

        if (currentCar) {
          switch (currentCar.currentSymbol) {
            case '^':
              currentCar.currentPosition[0] = currentCar.currentPosition[0] - 1;
              break;

            case 'v':
              currentCar.currentPosition[0] = currentCar.currentPosition[0] + 1;
              break;

            case '<':
              currentCar.currentPosition[1] = currentCar.currentPosition[1] - 1;
              break;

            case '>':
              currentCar.currentPosition[1] = currentCar.currentPosition[1] + 1;
              break;

            default:
              break;
          }

          const currentPos = currentCar.currentPosition.join(',');
          Object.keys(cars).map(id => {
            if (id !== sortedCar.key) {
              const compCar = cars[id];

              if (currentCar.currentPosition[0] === compCar.currentPosition[0] && currentCar.currentPosition[1] === compCar.currentPosition[1]) {
                console.log('KABLAM 😭');
                console.log(compCar, currentCar);
                console.log('removing: ', sortedCar.key, id);
                cars[sortedCar.key].deleted = true;
                cars[id].deleted = true;
                delete cars[sortedCar.key];
                delete cars[id];
                crash = currentPos;
              }
            }
          }); // because icky return

          if (!crash) {
            const cellValue = grid[currentCar.currentPosition[0]][currentCar.currentPosition[1]];

            switch (cellValue) {
              case '\\':
                switch (currentCar.currentSymbol) {
                  case '^':
                    currentCar.currentSymbol = '<';
                    break;

                  case 'v':
                    currentCar.currentSymbol = '>';
                    break;

                  case '<':
                    currentCar.currentSymbol = '^';
                    break;

                  case '>':
                    currentCar.currentSymbol = 'v';
                    break;

                  default:
                    break;
                }

                break;

              case '/':
                switch (currentCar.currentSymbol) {
                  case '^':
                    currentCar.currentSymbol = '>';
                    break;

                  case 'v':
                    currentCar.currentSymbol = '<';
                    break;

                  case '<':
                    currentCar.currentSymbol = 'v';
                    break;

                  case '>':
                    currentCar.currentSymbol = '^';
                    break;

                  default:
                    break;
                }

                break;

              case '+':
                switch (currentCar.lastIntersectionDirection) {
                  case 'left':
                    currentCar.lastIntersectionDirection = 'straight';
                    break;

                  case 'straight':
                    switch (currentCar.currentSymbol) {
                      case '^':
                        currentCar.currentSymbol = '>';
                        break;

                      case 'v':
                        currentCar.currentSymbol = '<';
                        break;

                      case '<':
                        currentCar.currentSymbol = '^';
                        break;

                      case '>':
                        currentCar.currentSymbol = 'v';
                        break;

                      default:
                        break;
                    }

                    currentCar.lastIntersectionDirection = 'right';
                    break;

                  case 'right':
                    switch (currentCar.currentSymbol) {
                      case '^':
                        currentCar.currentSymbol = '<';
                        break;

                      case 'v':
                        currentCar.currentSymbol = '>';
                        break;

                      case '<':
                        currentCar.currentSymbol = 'v';
                        break;

                      case '>':
                        currentCar.currentSymbol = '^';
                        break;

                      default:
                        break;
                    }

                    currentCar.lastIntersectionDirection = 'left';
                    break;

                  default:
                    break;
                }

                break;

              default:
                break;
            }
          }

          movedCars.push({
            id: sortedCar.key,
            position: currentCar.currentPosition
          });
        }
      });
      remainingCarCount = Object.keys(cars).length;
      moveCounter++;
    }

    console.log(cars); // reverse the answer because reasons

    return crash; // 98,125 -- wrong
    // 98,124 -- wrong
    // I was not correctly accounting for `>>>` scenarios
  }
};
exports.default = _default;
},{}],"days/day13/test.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  a: [{
    input: [`| `, `v `, `| `, `| `, `| `, `^ `, `| `],
    expected: '3,0'
  }, {
    input: [`/->-\\         `, `|   |  /----\\`, `| /-+--+-\\  |`, `| | |  | v  |`, `\\-+-/  \\-+--/`, `  \\------/   `],
    expected: '7,3'
  }],
  b: [{
    input: [`/>-<\\  `, `|   |  `, `| /<+-\\`, `| | | v`, `\\>+</ |`, `  |   ^`, `  \\<->/`],
    expected: '7,3'
  }, {
    input: [`->>>-`],
    expected: '7,3'
  }]
};
exports.default = _default;
},{}],"days/day13/index.js":[function(require,module,exports) {
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
},{"./solution":"days/day13/solution.js","./test":"days/day13/test.js"}],"days/day14/solution.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = require("lodash");

var _default = {
  a: input => {
    const recipes = [3, 7];
    const elves = [0, 1];
    const desiredRecipeCount = parseInt(input[0]);

    while (recipes.length < desiredRecipeCount + 10) {
      for (let e = 0; e < elves.length; e++) {
        const targetRecipe = 1 + recipes[elves[e]] + elves[e];

        if (targetRecipe > recipes.length - 1) {
          elves[e] = targetRecipe % recipes.length;
        } else {
          elves[e] = targetRecipe;
        }
      }

      const recipeSum = elves.reduce((prev, curr) => prev + recipes[curr], 0);
      recipes.push(...recipeSum.toString().split('').map(n => parseInt(n)));
    }

    return recipes.join('').substr(desiredRecipeCount, 10);
  },
  b: input => {
    const recipes = [3, 7];
    const elves = [0, 1];
    let done = false;
    let joined = '';

    while (!done) {
      for (let e = 0; e < elves.length; e++) {
        const targetRecipe = 1 + recipes[elves[e]] + elves[e];

        if (targetRecipe > recipes.length - 1) {
          elves[e] = targetRecipe % recipes.length;
        } else {
          elves[e] = targetRecipe;
        }
      }

      const recipeSum = elves.reduce((prev, curr) => prev + recipes[curr], 0);
      recipes.push(...recipeSum.toString().split('').map(n => parseInt(n)));
      joined = (0, _lodash.takeRight)(recipes, input[0].length * 2).join('');

      if (joined.indexOf(input) > -1) {
        const allJoined = recipes.join('');
        done = allJoined.indexOf(input[0]);
      }
    }

    return done;
  }
};
exports.default = _default;
},{}],"days/day14/test.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  a: [{
    input: [`5`],
    expected: '0124515891'
  }, {
    input: [`9`],
    expected: '5158916779'
  }, {
    input: [`18`],
    expected: '9251071085'
  }, {
    input: ['2018'],
    expected: '5941429882'
  }],
  b: [{
    input: [`01245`],
    expected: 5
  }, {
    input: [`51589`],
    expected: 9
  }, {
    input: [`92510`],
    expected: 18
  }, {
    input: ['59414'],
    expected: 2018
  }]
};
exports.default = _default;
},{}],"days/day14/index.js":[function(require,module,exports) {
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
},{"./solution":"days/day14/solution.js","./test":"days/day14/test.js"}],"days/index.js":[function(require,module,exports) {
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
Object.defineProperty(exports, "day4", {
  enumerable: true,
  get: function () {
    return _day4.default;
  }
});
Object.defineProperty(exports, "day5", {
  enumerable: true,
  get: function () {
    return _day5.default;
  }
});
Object.defineProperty(exports, "day6", {
  enumerable: true,
  get: function () {
    return _day6.default;
  }
});
Object.defineProperty(exports, "day7", {
  enumerable: true,
  get: function () {
    return _day7.default;
  }
});
Object.defineProperty(exports, "day8", {
  enumerable: true,
  get: function () {
    return _day8.default;
  }
});
Object.defineProperty(exports, "day9", {
  enumerable: true,
  get: function () {
    return _day9.default;
  }
});
Object.defineProperty(exports, "day10", {
  enumerable: true,
  get: function () {
    return _day10.default;
  }
});
Object.defineProperty(exports, "day11", {
  enumerable: true,
  get: function () {
    return _day11.default;
  }
});
Object.defineProperty(exports, "day12", {
  enumerable: true,
  get: function () {
    return _day12.default;
  }
});
Object.defineProperty(exports, "day13", {
  enumerable: true,
  get: function () {
    return _day13.default;
  }
});
Object.defineProperty(exports, "day14", {
  enumerable: true,
  get: function () {
    return _day14.default;
  }
});

var _day = _interopRequireDefault(require("./day1"));

var _day2 = _interopRequireDefault(require("./day2"));

var _day3 = _interopRequireDefault(require("./day3"));

var _day4 = _interopRequireDefault(require("./day4"));

var _day5 = _interopRequireDefault(require("./day5"));

var _day6 = _interopRequireDefault(require("./day6"));

var _day7 = _interopRequireDefault(require("./day7"));

var _day8 = _interopRequireDefault(require("./day8"));

var _day9 = _interopRequireDefault(require("./day9"));

var _day10 = _interopRequireDefault(require("./day10"));

var _day11 = _interopRequireDefault(require("./day11"));

var _day12 = _interopRequireDefault(require("./day12"));

var _day13 = _interopRequireDefault(require("./day13"));

var _day14 = _interopRequireDefault(require("./day14"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./day1":"days/day1/index.js","./day2":"days/day2/index.js","./day3":"days/day3/index.js","./day4":"days/day4/index.js","./day5":"days/day5/index.js","./day6":"days/day6/index.js","./day7":"days/day7/index.js","./day8":"days/day8/index.js","./day9":"days/day9/index.js","./day10":"days/day10/index.js","./day11":"days/day11/index.js","./day12":"days/day12/index.js","./day13":"days/day13/index.js","./day14":"days/day14/index.js"}],"runner.js":[function(require,module,exports) {
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