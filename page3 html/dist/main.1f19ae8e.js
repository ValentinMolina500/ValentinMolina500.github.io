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
})({"main.js":[function(require,module,exports) {
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var canvas = document.getElementById("myCanvas");
/** @type {CanvasRenderingContext2D} */

var ctx = canvas.getContext("2d");
var spacePressed = false;
var spaceUp = false;
var condition = false;
var cHeight = canvas.clientHeight;
var cWidth = canvas.clientWidth;
var squaredx = 1;
var enemydx = 1;
var baseImage = document.getElementById("source");
var time = new Date();
var currentTime = time.getSeconds();
var interval = 1;
/*var timing =
    [
        {
            time: 0,
            taken: false
        },
        {
            time: 5,
            taken: false
        },
        {
            time: 10,
            taken: false
        },
        {
            time: 15,
            taken: false
        },
        {
            time: 20,
            taken: false
        },
        {
            time: 25,
            taken: false
        },
        {
            time: 30,
            taken: false
        },
        {
            time: 35,
            taken: false
        },
        {
            time: 40,
            taken: false
        },
        {
            time: 45,
            taken: false
        },
        {
            time: 50,
            taken: false
        },
        {
            time: 55,
            taken: false
        },
    ];
*/

var timing = [];

for (var p = 0; p < Math.floor(60 / interval); p++) {
  timing.push({
    time: 0 + interval * p,
    taken: false
  });
}

var distances = [295, 265, 235, 205, 175, 145, 115, 85, 55, 25];

var hero =
/*#__PURE__*/
function () {
  function hero() {
    _classCallCheck(this, hero);

    this.x = canvas.clientWidth / 2 - 16;
    this.y = canvas.clientHeight / 2 - 16;
    this.width = 32;
    this.height = 32;
    this.color = "#74b9ff";
  }

  _createClass(hero, [{
    key: "draw",
    value: function draw() {
      ctx.drawImage(baseImage, this.x, this.y);
    }
  }, {
    key: "update",
    value: function update() {
      this.y += squaredx;
      if (this.y > cHeight - this.height || this.y < 0) squaredx = -squaredx;
    }
  }]);

  return hero;
}();

var enemy =
/*#__PURE__*/
function () {
  function enemy(y) {
    _classCallCheck(this, enemy);

    this.x = 0 - 50;
    this.y = y;
    this.width = 50;
    this.height = 25;
    this.color = "red";
  }

  _createClass(enemy, [{
    key: "draw",
    value: function draw() {
      ctx.beginPath();
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.closePath();
    }
  }, {
    key: "update",
    value: function update() {
      this.x += enemydx;
    }
  }]);

  return enemy;
}();

var square = new hero();
var enemies = [];

function distanceFrom(x1, y1, x2, y2) {
  xDistance = x2 - x1;
  yDistance = y2 - y1;
  return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}

function timer() {
  var d = new Date();
  var timedif = Math.abs(d.getSeconds() - currentTime);

  if (timedif % interval == 0) {
    for (var i = 0; i < timing.length; i++) {
      if (timing[i].time === timedif && !timing[i].taken && timedif != 0) {
        if (timedif == 60 - interval) timing[0].taken = false;
        timing[i].taken = true;
        return true;
      }

      if (timedif == 0 && !timing[0].taken) {
        timing[0] = true;

        for (var j = 1; j < timing.length; j++) {
          timing[i].taken = false;
        }

        return true;
      }
    }
  }
}

function spawnEnemies() {
  var random;

  if (timer()) {
    random = Math.floor(Math.random() * distances.length);
    var enemy1 = new enemy(distances[random]);
    enemies.push(enemy1); //}
  }
}

function keyDownHandler(e) {
  if (e.keyCode == 32) {
    spacePressed = true;
    spaceUp = false;
  }
}

function keyUpHandler(e) {
  if (e.keyCode == 32) {
    spacePressed = false;
    spaceUp = true;
    squaredx = -squaredx;
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

  if (!condition) {
    ctx.font = "30px Arial";
    ctx.fillText("Welcome to my game", cWidth / 2 - 120, cHeight / 2);
    ctx.fillText("I hope you enjoy it", cWidth / 2 - 120, cHeight / 2 + 30);
    ctx.fillText(":) :) :) :) :) :)", cWidth / 2 - 120, cHeight / 2 + 60);
    ctx.fillText("Press space you dummy", cWidth / 2 - 120, cHeight / 2 + 90);

    if (spaceUp) {
      condition = true;
    }
  }

  if (condition) {
    square.draw();
    square.update();
    spawnEnemies();

    for (var i = 0; i < enemies.length; i++) {
      enemies[i].draw();
      enemies[i].update();

      if (distanceFrom(square.x, square.y, enemies[i].x, enemies[i].y) < enemies[i].width / 2 + square.width || enemies[i].x > cWidth + enemies[i].width) {
        enemies.splice(i, 1);
      }
    }
  }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
setInterval(draw, 10);
},{}],"../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "60322" + '/');

  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","main.js"], null)
//# sourceMappingURL=/main.1f19ae8e.map