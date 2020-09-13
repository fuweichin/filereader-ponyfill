(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.FileReaderAsync = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports) {
  "use strict";

  _exports.__esModule = true;
  _exports.default = void 0;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  var FileReaderAsync = /*#__PURE__*/function () {
    function FileReaderAsync() {
      this.r = new FileReader();
      Object.defineProperty(this, 'r', {
        configurable: true
      });
    }

    var _proto = FileReaderAsync.prototype;

    _proto.readAs = function readAs(dataType, file) {
      var _this = this;

      switch (dataType) {
        case 'ArrayBuffer':
        case 'Text':
        case 'BinaryString':
        case 'DataURL':
          break;

        default:
          throw new Error('Unrecognized data type');
      }

      return new Promise(function (resolve, reject) {
        var r = _this.r;

        if (r.readyState !== FileReader.EMPTY) {
          reject('The reader is already in used');
          return;
        }

        r.onload = function () {
          resolve(r.result);
        };

        r.onerror = function () {
          reject(r.error);
        };

        r['readAs' + dataType](file);
      });
    };

    _proto.readAsText = function readAsText(file) {
      return this.readAs('Text', file);
    };

    _proto.readAsArrayBuffer = function readAsArrayBuffer(file) {
      return this.readAs('ArrayBuffer', file);
    };

    _proto.readAsBinaryString = function readAsBinaryString(file) {
      return this.readAs('BinaryString', file);
    };

    _proto.readAsDataURL = function readAsDataURL(file) {
      return this.readAs('DataURL', file);
    };

    _createClass(FileReaderAsync, [{
      key: "readyState",
      get: function get() {
        return this.r.readyState;
      }
    }]);

    return FileReaderAsync;
  }();

  var _default = FileReaderAsync;
  _exports.default = _default;
});
//# sourceMappingURL=FileReaderAsync.js.map