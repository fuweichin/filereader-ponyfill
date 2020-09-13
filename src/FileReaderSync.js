class FileReaderSync {
  constructor() {
    Object.defineProperty(this, '_s', {writable: true, configurable: true, value: FileReader.EMPTY});
  }
  get readyState() {
    return this._s;
  }
  readAs(dataType, file) {
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
    let url;
    let xhr;
    let text;
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
      if (url)
        URL.revokeObjectURL(url);
    }
    switch (dataType) {
      case 'ArrayBuffer': {
        return binaryToArrayBuffer(text);
      }
      case 'Text': {
        return new TextDecoder().decode(binaryToArrayBuffer(text));
      }
      case 'BinaryString': {
        return text;
      }
      case 'DataURL': {
        let type = xhr.getResponseHeader('content-type');
        type = type ? type.split(';')[0] : '';
        return 'data:' + type + ';base64,' + btoa(text);
      }
    }
    return null;
  }
  readAsText(file) {
    return this.readAs('Text', file);
  }
  readAsArrayBuffer(file) {
    return this.readAs('ArrayBuffer', file);
  }
  readAsBinaryString(file) {
    return this.readAs('BinaryString', file);
  }
  readAsDataURL(file) {
    return this.readAs('DataURL', file);
  }
}

function binaryToArrayBuffer(binStr) {
  let len = binStr.length;
  let arr = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    arr[i] = binStr.charCodeAt(i);
  }
  return arr.buffer;
}

export default FileReaderSync;
