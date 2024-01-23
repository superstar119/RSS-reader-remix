import {
  require_react
} from "/build/_shared/chunk-BOXFZXVX.js";
import {
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// node_modules/react-loading-icons/dist/esm/components/audio.js
var import_react = __toESM(require_react());

// node_modules/react-loading-icons/dist/esm/components/ball-triangle.js
var import_react2 = __toESM(require_react());

// node_modules/react-loading-icons/dist/esm/components/bars.js
var import_react3 = __toESM(require_react());

// node_modules/react-loading-icons/dist/esm/components/circles.js
var import_react4 = __toESM(require_react());

// node_modules/react-loading-icons/dist/esm/components/grid.js
var import_react5 = __toESM(require_react());

// node_modules/react-loading-icons/dist/esm/components/hearts.js
var import_react6 = __toESM(require_react());

// node_modules/react-loading-icons/dist/esm/components/oval.js
var import_react7 = __toESM(require_react());

// node_modules/react-loading-icons/dist/esm/components/puff.js
var import_react8 = __toESM(require_react());

// node_modules/react-loading-icons/dist/esm/components/rings.js
var import_react9 = __toESM(require_react());

// node_modules/react-loading-icons/dist/esm/components/spinning-circles.js
var import_react10 = __toESM(require_react());

// node_modules/react-loading-icons/dist/esm/components/tail-spin.js
var import_react11 = __toESM(require_react());

// node_modules/react-loading-icons/dist/esm/components/three-dots.js
var import_react12 = __toESM(require_react());
var __assign = function() {
  __assign = Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
function ThreeDots(props) {
  var _a, _b, _c, _d;
  var speed = Number(String((_a = props.speed) !== null && _a !== void 0 ? _a : 1));
  var fill = (_b = props.fill) !== null && _b !== void 0 ? _b : "#fff";
  var stroke = props.stroke;
  var fillOpacity = props.fillOpacity;
  var strokeOpacity = props.strokeOpacity;
  return import_react12.default.createElement(
    "svg",
    __assign({}, __assign(__assign({}, props), { className: props.className ? "icon-loading ".concat(props.className) : "icon-loading", fill: void 0, fillOpacity: void 0, height: (_c = props.height) !== null && _c !== void 0 ? _c : 30, speed: void 0, stroke: void 0, strokeOpacity: void 0, strokeWidth: void 0, width: (_d = props.width) !== null && _d !== void 0 ? _d : 120 }), { viewBox: "0 0 120 30" }),
    import_react12.default.createElement(
      "circle",
      __assign({ cx: 15, cy: 15, r: 15 }, { fill, stroke, fillOpacity, strokeOpacity }),
      import_react12.default.createElement("animate", { attributeName: "r", from: 15, to: 15, begin: "0s", dur: "".concat(0.8 / speed, "s"), values: "15;9;15", calcMode: "linear", repeatCount: "indefinite" }),
      import_react12.default.createElement("animate", { attributeName: "fill-opacity", from: 1, to: 1, begin: "0s", dur: "".concat(0.8 / speed, "s"), values: "1;.5;1", calcMode: "linear", repeatCount: "indefinite" })
    ),
    import_react12.default.createElement(
      "circle",
      __assign({ cx: 60, cy: 15, r: 9 }, { fill, stroke, fillOpacity, strokeOpacity }),
      import_react12.default.createElement("animate", { attributeName: "r", from: 9, to: 9, begin: "0s", dur: "".concat(0.8 / speed, "s"), values: "9;15;9", calcMode: "linear", repeatCount: "indefinite" }),
      import_react12.default.createElement("animate", { attributeName: "fill-opacity", from: 0.5, to: 0.5, begin: "0s", dur: "".concat(0.8 / speed, "s"), values: ".5;1;.5", calcMode: "linear", repeatCount: "indefinite" })
    ),
    import_react12.default.createElement(
      "circle",
      __assign({ cx: 105, cy: 15, r: 15 }, { fill, stroke, fillOpacity, strokeOpacity }),
      import_react12.default.createElement("animate", { attributeName: "r", from: 15, to: 15, begin: "0s", dur: "".concat(0.8 / speed, "s"), values: "15;9;15", calcMode: "linear", repeatCount: "indefinite" }),
      import_react12.default.createElement("animate", { attributeName: "fill-opacity", from: 1, to: 1, begin: "0s", dur: "".concat(0.8 / speed, "s"), values: "1;.5;1", calcMode: "linear", repeatCount: "indefinite" })
    )
  );
}

// node_modules/react-loading-icons/dist/esm/index.js
var ThreeDots2 = ThreeDots;

export {
  ThreeDots2 as ThreeDots
};
//# sourceMappingURL=/build/_shared/chunk-GI4A5DXZ.js.map
