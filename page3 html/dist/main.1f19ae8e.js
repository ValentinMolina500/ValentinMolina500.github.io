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

// DOM variables
var nodes = document.querySelectorAll("canvas");
var canvas = nodes[0];
var ctx = canvas.getContext('2d');
var secondCanvas = nodes[nodes.length - 1];
var ctx2 = secondCanvas.getContext('2d');
ctx2.font = "30px Comic Sans MS"; // modal :D

var modal = document.getElementById('myModal');
var span = document.getElementsByClassName("close")[0];
var modalText = document.querySelector("p");
var modalImage = document.querySelector('img');
var myMusic = document.querySelector('audio'); //var myMusic2 = document.getElementById('myAudio2');

myMusic.volume = "0.7"; //myMusic2.volume = "0.7";

setTimeout(function () {
  return myMusic.play();
}, 1000); // initial variables

var mainSquare;
var myEnemies = []; //var myEnemiesUp = [];

var distancesX = [0, 46, 92, 138, 184, 230, 276, 322, 414]; //480

var distances = [0, 46, 92, 138, 184, 230, 276]; //y 320

var sqSpeed = 0;
var timeSince = 0; // images

var mainSquareImage = document.getElementById("source");
var enemyImage = document.getElementById("enemy");
var buttonImage = document.getElementById("button");
var enemyUpImage = document.getElementById("enemyUp");
var speedUpImage = document.getElementById("speedUp");
var speedDownImage = document.getElementById("speedDown");
var invincibleImage = document.getElementById("invincible");
var myUpBtn;
var myDownBtn;
var myLeftBtn;
var myRightBtn;
var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;
var spawnDiff = 0;
var mobSpeed = 0;

function startGame() {
  mainSquare = new component(32, 32, canvas.width / 2, canvas.height / 2, mainSquareImage);
  myUpBtn = new component(32, 32, 380, 210, buttonImage);
  myDownBtn = new component(32, 32, 380, 270, buttonImage);
  myLeftBtn = new component(32, 32, 350, 240, buttonImage);
  myRightBtn = new component(32, 32, 410, 240, buttonImage);
  myGameArea.start();
}

var myGameArea = {
  start: function start() {
    this.score = 0;
    this.frameNo = 0;
    this.interval = setInterval(updateGameArea, 20);
    window.addEventListener('mousedown', function (e) {
      //e.preventDefault();
      myGameArea.x = e.pageX;
      myGameArea.y = e.pageY;
    });
    window.addEventListener('mouseup', function (e) {
      //e.preventDefault();
      myGameArea.x = false;
      myGameArea.y = false;
    });
    window.addEventListener('touchstart', function (e) {
      //e.preventDefault();
      myGameArea.x = e.pageX;
      myGameArea.y = e.pageY;
      myGameArea.x = e.touches[0].pageX;
      myGameArea.y = e.touches[0].pageY;
    });
    window.addEventListener('touchend', function (e) {
      //e.preventDefault();
      myGameArea.x = false;
      myGameArea.y = false;
    });
    window.addEventListener("touchmove", function (e) {
      //e.preventDefault();
      myGameArea.x = e.touches[0].pageX;
      myGameArea.y = e.touches[0].pageY;
    });
    window.addEventListener("keydown", function (e) {
      e.preventDefault();
      if (e.keyCode == 68 || e.keyCode == 39) rightPressed = true;else if (e.keyCode == 65 || e.keyCode == 37) leftPressed = true;else if (e.keyCode == 87 || e.keyCode == 38) upPressed = true;else if (e.keyCode == 83 || e.keyCode == 40) downPressed = true;
    });
    window.addEventListener("keyup", function (e) {
      e.preventDefault();
      if (e.keyCode == 68 || e.keyCode == 39) rightPressed = false;else if (e.keyCode == 65 || e.keyCode == 37) leftPressed = false;else if (e.keyCode == 87 || e.keyCode == 38) upPressed = false;else if (e.keyCode == 83 || e.keyCode == 40) downPressed = false;
    });
  },
  clear: function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx2.clearRect(0, 0, secondCanvas.width, secondCanvas.height);
  },
  stop: function stop() {
    clearInterval(this.interval);
  },
  scoreUpdate: function scoreUpdate() {
    ctx.font = "30px Comic Sans MS";
    ctx.fillText("score: " + this.score, 310, 50);
  }
};

var component =
/*#__PURE__*/
function () {
  function component(width, height, x, y, image) {
    _classCallCheck(this, component);

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.image = image;
    this.speedX = 0;
    this.speedY = 0;
    this.invincible = false;
  }

  _createClass(component, [{
    key: "update",
    value: function update() {
      ctx.drawImage(this.image, this.x, this.y);
    }
  }, {
    key: "newPos",
    value: function newPos() {
      this.x += this.speedX;
      this.y += this.speedY;
    }
  }, {
    key: "collision",
    value: function collision(otherobj) {
      var myleft = this.x;
      var myright = this.x + this.width;
      var mytop = this.y;
      var mybottom = this.y + this.height;
      var otherleft = otherobj.x;
      var otherright = otherobj.x + otherobj.width;
      var othertop = otherobj.y;
      var otherbottom = otherobj.y + otherobj.height;
      var crash = true;

      if (mybottom < othertop || mytop > otherbottom || myright < otherleft || myleft > otherright) {
        crash = false;
      }

      return crash;
    }
  }, {
    key: "clicked",
    value: function clicked() {
      var myleft = this.x;
      var myright = this.x + this.width;
      var mytop = this.y;
      var mybottom = this.y + this.height;
      var clicked = true;

      if (mybottom < myGameArea.y || mytop > myGameArea.y || myright < myGameArea.x || myleft > myGameArea.x) {
        clicked = false;
      }

      return clicked;
    }
  }, {
    key: "laser",
    value: function laser() {
      if (this.image === enemyImage) {
        ctx.beginPath();
        ctx.rect(0, this.y + this.height / 2 - 2, this.x, 4); //ctx.rect()

        ctx.fillStyle = "rgba(238, 17, 17, 0.31)";
        ctx.fill();
        ctx.closePath();
        ctx.fillStyle = "black";
      } else if (this.width == 25) {
        ctx.beginPath();
        ctx.rect(this.x + this.width / 2 - 2, 0, 4, this.y);
        ctx.fillStyle = "rgba(238, 17, 17, 0.25)";
        ctx.fill();
        ctx.closePath();
        ctx.fillStyle = "black";
      }
    }
  }]);

  return component;
}();

function updateGameArea() {
  var x, y; // canvas on screen button implementation

  if (myGameArea.x && myGameArea.y) {
    if (myUpBtn.clicked()) {
      mainSquare.y += -2;
    }

    if (myDownBtn.clicked()) {
      mainSquare.y += 2;
    }

    if (myLeftBtn.clicked()) {
      mainSquare.x += -2;
    }

    if (myRightBtn.clicked()) {
      mainSquare.x += 2;
    }
  } // WASD movement implementation


  if (rightPressed && mainSquare.x + 3 + sqSpeed < canvas.width - mainSquare.width) {
    mainSquare.x += 3 + sqSpeed;
  } else if (leftPressed && mainSquare.x - 3 - sqSpeed > -3) {
    mainSquare.x += -3 - sqSpeed;
  } else if (upPressed && mainSquare.y - 3 - sqSpeed > -3) {
    mainSquare.y += -3 - sqSpeed;
  } else if (downPressed && mainSquare.y + 3 + sqSpeed < canvas.height - mainSquare.height + 3) {
    mainSquare.y += 3 + sqSpeed;
  } // frame and clear


  myGameArea.clear();
  myGameArea.frameNo += 1; // spawning horizontal mobs

  if (myGameArea.frameNo == 1 || everyInterval(40 - spawnDiff)) {
    x = canvas.width + 50;
    y = distances[Math.floor(Math.random() * distances.length)];
    myEnemies.push(new component(50, 25, x, y, enemyImage));
  } // spawning vertical mobs


  if (everyInterval(40 - spawnDiff)) {
    x = distancesX[Math.floor(Math.random() * distancesX.length)];
    y = canvas.height + 50;
    myEnemies.push(new component(25, 50, x, y, enemyUpImage));
  } // spawing powerups


  if (everyInterval(550)) {
    x = canvas.width + 50;
    y = distances[Math.floor(Math.random() * distances.length)];
    myEnemies.push(new component(16, 16, x, y, speedUpImage));
  }

  if (everyInterval(750)) {
    x = canvas.width + 50;
    y = distances[Math.floor(Math.random() * distances.length)];
    myEnemies.push(new component(16, 16, x, y, speedDownImage));
  }

  if (everyInterval(1050) && !mainSquare.invincible) {
    x = canvas.width + 50;
    y = distances[Math.floor(Math.random() * distances.length)];
    myEnemies.push(new component(16, 16, x, y, invincibleImage));
  } // updating score


  if (everyInterval(45)) {
    myGameArea.score++;
  } // updating movement for enemies


  for (i = 0; i < myEnemies.length; i++) {
    if (myEnemies[i].x > canvas.width + 50 || myEnemies[i].y < 0 - myEnemies[i].height && myEnemies[i].x > 0) {
      myEnemies.splice(i, 1);
    }

    if (myEnemies[i].width == 50 || myEnemies[i].width == 16) {
      myEnemies[i].x += -2 - mobSpeed;
      myEnemies[i].laser();
      myEnemies[i].update();
    }

    if (myEnemies[i].width == 25) {
      myEnemies[i].y += -2 - mobSpeed;
      myEnemies[i].laser();
      myEnemies[i].update();
    }

    if (mainSquare.collision(myEnemies[i])) {
      if (myEnemies[i].image == speedUpImage) {
        if (sqSpeed < 2) {
          sqSpeed++;
        }

        myEnemies.splice(i, 1);
      } else if (myEnemies[i].image == speedDownImage) {
        if (sqSpeed > -2) {
          sqSpeed--;
        }

        myEnemies.splice(i, 1);
      } else if (myEnemies[i].image == invincibleImage) {
        mainSquare.invincible = true;
        timeSince = myGameArea.frameNo;
        myEnemies.splice(i, 1);
      } else if (!mainSquare.invincible) {
        myGameArea.stop();
        myMusic.pause(); //myMusic2.pause();

        modal.style.display = "block";
        var emotion = void 0;
        var giphyAPI = void 0;

        span.onclick = function () {
          modal.style.display = "none";
          window.location = location;
        };

        window.onclick = function (e) {
          if (e.target == modal) modal.style.display = "none";
          window.location = location;
        };

        if (myGameArea.score < 50) {
          modalText.innerHTML = "You lose! Your score was " + myGameArea.score + ". Looks like you need some practice. Click outside the modal to try again.";
          emotion = "sad";
          giphyAPI = "https://api.giphy.com/v1/gifs/random?tag=" + emotion + "&api_key=FS7DZSLxVLnAPoHAIzv2sr3p9eo8HmOM";
          fetch(giphyAPI).then(function (response) {
            return response.json();
          }).then(function (json) {
            console.log(json);
            modalImage.src = json.data.images['downsized'].url;
          }).catch(function (err) {
            return console.log(err);
          });
        }

        if (myGameArea.score >= 50 && myGameArea.score < 99) {
          modalText.innerHTML = "You lose! Your score was " + myGameArea.score + ". Not bad. Click outside the modal to try again.";
          emotion = "impressed";
          giphyAPI = "https://api.giphy.com/v1/gifs/random?tag=" + emotion + "&api_key=FS7DZSLxVLnAPoHAIzv2sr3p9eo8HmOM";
          fetch(giphyAPI).then(function (response) {
            return response.json();
          }).then(function (json) {
            console.log(json);
            modalImage.src = json.data.images['downsized'].url;
          }).catch(function (err) {
            return console.log(err);
          });
        }

        if (myGameArea.score >= 100 && myGameArea.score < 150) {
          modalText.innerHTML = "You lose! Your score was " + myGameArea.score + ". Wow, you're pretty good at this! Click outside the modal to try again.";
          emotion = "Amazing";
          giphyAPI = "https://api.giphy.com/v1/gifs/random?tag=" + emotion + "&api_key=FS7DZSLxVLnAPoHAIzv2sr3p9eo8HmOM";
          fetch(giphyAPI).then(function (response) {
            return response.json();
          }).then(function (json) {
            console.log(json);
            modalImage.src = json.data.images['downsized'].url;
          }).catch(function (err) {
            return console.log(err);
          });
        }

        if (myGameArea.score >= 150 && myGameArea.score < 199) {
          modalText.innerHTML = "You lose! Your score was " + myGameArea.score + ". Amazing, you're parents must be proud! Click outside the modal to try again.";
        }

        if (myGameArea.score > 200) {
          modalText.innerHTML = "You lose! Your score was " + myGameArea.score + ". You are the Square Game Master! Click outside the modal to try again.";
        } //modalImage.src = result.data.images['downsized'].url;

      }
    }
  } // hero and button updates

  /*myUpBtn.update();
  myDownBtn.update();
  myLeftBtn.update();
  myRightBtn.update();*/


  if (myGameArea.frameNo > timeSince + 300) {
    mainSquare.invincible = false;
  } // second canvas drawings


  ctx2.fillText("Speed: " + (sqSpeed + 3) + "/5", 0, secondCanvas.height / 2);

  if (mainSquare.invincible) {
    ctx2.fillStyle = "yellow";
    ctx2.fillText("Invincible!", 180, secondCanvas.height / 2);
    ctx2.fillStyle = "black";
  }

  if (myGameArea.score >= 50 && myGameArea.score < 100) {
    ctx2.fillText("Wow, you're good", 340, secondCanvas.height / 2);
  }

  if (myGameArea.score >= 100) {
    ctx2.fillText("Amazing!", 340, secondCanvas.height / 2);
  }

  if (myGameArea.frameNo == 2250) {
    //myMusic.pause();
    // myMusic2.play();
    spawnDiff = 10;
    mobSpeed = 1;
  }

  if (myGameArea.frameNo == 2250 * 3) {
    //myMusic.pause();
    //myMusic2.play();
    spawnDiff += 10;
    mobSpeed += 1;
  }

  mainSquare.newPos();
  mainSquare.update();
  myGameArea.scoreUpdate();
} // logic


function everyInterval(n) {
  if (myGameArea.frameNo / n % 1 == 0) return true;
  return false;
}

window.onload = function () {
  startGame();
};
},{}],"../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "53174" + '/');

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
},{}]},{},["../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","main.js"], null)
//# sourceMappingURL=/main.1f19ae8e.map