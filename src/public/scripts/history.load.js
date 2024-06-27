const historyRead = async () => {
  return new Promise((resolve, reject) => {
    fetch("/data/history.json")
      .then((response) => response.json())
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
