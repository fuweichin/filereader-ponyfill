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
    global.FileReaderSync = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports) {
  "use strict";

  _exports.__esModule = true;
  _exports.default = void 0;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  var FileReaderSync = /*#__PURE__*/function () {
    function FileReaderSync() {
      Object.defineProperty(this, '_s', {
        writable: true,
        configurable: true,
        value: FileReader.EMPTY
      });
    }

    var _proto = FileReaderSync.prototype;

    _proto.readAs = function readAs(dataType, file) {
      if (this._s !== FileReader.EMPTY) {
        throw new Error('The reader is already in used');
      }

      this._s = FileReader.LOADING;

      switch (dataType) {
        case 'ArrayBuffer':
        case 'Text':
        case 'BinaryString':
        case 'DataURL':
          break;

        default:
          throw new Error('Unrecognized data type');
      }

      var url;
      var xhr;
      var text;

      try {
        url = URL.createObjectURL(file);
        xhr = new XMLHttpRequest();
        xhr.open('GET', url, false);
        xhr.overrideMimeType('text/plain; charset=x-user-defined');
        xhr.send();
        text = xhr.responseText;
        this._s = FileReader.DONE;
      } catch (e) {
        throw new Error('Error while reading file');
      } finally {
        if (url) URL.revokeObjectURL(url);
      }

      switch (dataType) {
        case 'ArrayBuffer':
          {
            return binaryToArrayBuffer(text);
          }

        case 'Text':
          {
            return new TextDecoder().decode(binaryToArrayBuffer(text));
          }

        case 'BinaryString':
          {
            return text;
          }

        case 'DataURL':
          {
            var type = xhr.getResponseHeader('content-type');
            type = type ? type.split(';')[0] : '';
            return 'data:' + type + ';base64,' + btoa(text);
          }
      }

      return null;
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

    _createClass(FileReaderSync, [{
      key: "readyState",
      get: function get() {
        return this._s;
      }
    }]);

    return FileReaderSync;
  }();

  function binaryToArrayBuffer(binStr) {
    var len = binStr.length;
    var arr = new Uint8Array(len);

    for (var i = 0; i < len; i++) {
      arr[i] = binStr.charCodeAt(i);
    }

    return arr.buffer;
  }

  var _default = FileReaderSync;
  _exports.default = _default;
});
//# sourceMappingURL=FileReaderSync.js.map