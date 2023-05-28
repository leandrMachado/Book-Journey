class KeyPressListener {
  constructor(callback) {
    let keySafe = true;

    this.keydownFunction = function (event) {
      let key = event.keyCode || event.which;
      if ((key >= 65 && key <= 90) || key === 13) {
        if (keySafe) {
          keySafe = false;
          callback(key);
        }
      } else if (event.keyCode === 8 || event.keyCode === 32) {
        callback(key);
      }
      else if (event.keyCode === 32) {
        callback(key)
      }
    };

    this.keyupFunction = function (event) {
      keySafe = true;
    };

    document.addEventListener("keydown", this.keydownFunction);
    document.addEventListener("keyup", this.keyupFunction);
  }
}
