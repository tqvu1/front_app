export default class MyUploadAdapter {
  loader: any;

  constructor(loader) {
    this.loader = loader;
  }

  upload() {
    return Promise.resolve({
      urls: {
        default: this.loader.data,
      },
    });
  }

  abort() {
    // Reject the promise returned from the upload() method.
  }
}
