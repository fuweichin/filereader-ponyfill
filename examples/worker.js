self.onmessage = (e)=> {
  let [action, file] = e.data;
  if (action === 'readAsText') {
    try {
      let r = new FileReaderSync();
      let result = r.readAsText(file);
      self.postMessage([0, result]);
    } catch (error) {
      self.postMessage([1, error]);
    }
  }
};
