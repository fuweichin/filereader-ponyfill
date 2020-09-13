# filereader-ponyfill

This package contains

+ `FileReaderAsync` -  a promisified edition of `FileReader`
+ `FileReaderSync` - a porting of web worker's native `FileReaderSync` for main thread



## Install

```sh
npm install import-ponyfill
```



## Usage

### FileReaderAsync

Sometimes you only need to use the load-error event of FileReader API and want to use promisified methods to fully read a file.

In short `FileReaderAsync` is to `FileReader` what  `fetch` is to `XMLHttpRequest`

Example usage:

```js
import {FileReaderAsync} from 'filereader-ponyfill';
// import FileReaderAsync from 'filereader-ponyfill/src/FileReaderAsync.js'; // ESM
// import FileReaderAsync from 'filereader-ponyfill/dist/FileReaderAsync.js'; // UMD

new FileReaderAsync().readAsText(file).then((text)=> {

}, (error)=> {

});

// or
try {
  let text = await new FileReaderAsync().readAsText(file);
} catch (error) {

}
```



### FileReaderSync for main thread

In some extreme situations you may want to read a file synchronously, native `FileReaderSync` can do that but is only available in Web Worker.

This  `FileReaderSync` is designed for main thread and implemented behaviors of web worker's native `FileReaderSync`.

Example usage:

```js
import {FileReaderSync} from 'filereader-ponyfill';
// import FileReaderSync from 'filereader-ponyfill/src/FileReaderSync.js'; // ESM
// import FileReaderSync from 'filereader-ponyfill/dist/FileReaderSync.js'; // UMD

try {
  let text = new FileReaderSync().readAsText(file);
} catch (error) {

}
```

Implementation notes:

```txt
[ blob ] ------> URL.createObjectURL ------> [ blobUrl ]
                                                       |
[ binaryString ] <------> sync XMLHttpRequest <------
|
------> TextDecoder / btoa / ... ------> [ finalData ]
```

