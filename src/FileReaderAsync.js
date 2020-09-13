class FileReaderAsync {
  constructor() {
    this.r = new FileReader();
    Object.defineProperty(this, 'r', {configurable: true});
  }
  get readyState() {
    return this.r.readyState;
  }
  readAs(dataType, file) {
    switch (dataType) {
      case 'ArrayBuffer':
      case 'Text':
      case 'BinaryString':
      case 'DataURL':
        break;
      default:
        throw new Error('Unrecognized data type');
    }
    return new Promise((resolve, reject)=> {
      let {r} = this;
      if (r.readyState !== FileReader.EMPTY) {
        reject('The reader is already in used');
        return;
      }
      r.onload = ()=> {
        resolve(r.result);
      };
      r.onerror = ()=> {
        reject(r.error);
      };
      r['readAs' + dataType](file);
    });
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

export default FileReaderAsync;
