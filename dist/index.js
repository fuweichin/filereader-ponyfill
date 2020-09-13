(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "./FileReaderAsync.js", "./FileReaderSync.js"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("./FileReaderAsync.js"), require("./FileReaderSync.js"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.FileReaderAsync, global.FileReaderSync);
    global.index = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _FileReaderAsync, _FileReaderSync) {
  "use strict";

  _exports.__esModule = true;
  _FileReaderAsync = _interopRequireDefault(_FileReaderAsync);
  _exports.FileReaderAsync = _FileReaderAsync.default;
  _FileReaderSync = _interopRequireDefault(_FileReaderSync);
  _exports.FileReaderSync = _FileReaderSync.default;

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
});
//# sourceMappingURL=index.js.map