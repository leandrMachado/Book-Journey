const historyRead = async () => {
  return new Promise((resolve, reject) => {
    fetch("/data/history.json")
      .then((response) => response.json())
      .then((data) => {
        console.log(data[0]);
        data.shift();
        resolve(data[0].history);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
