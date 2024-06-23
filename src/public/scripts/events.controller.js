const typing_ = (phrase, chapter = false) => {
  const delay = 110;
  let charIndex = 0;

  return new Promise(async (resolve, reject) => {
    const commandExit = document.createElement("p");

    if (chapter) commandExit.classList.add("chapter");

    document.querySelector(".terminal").appendChild(commandExit);

    const typingDelay = setInterval(() => {
      commandExit.innerHTML = phrase;
      charIndex++;

      if (charIndex === 1) {
        clearInterval(typingDelay);
        resolve();
      }
    }, delay);
  })
};

const typingOptions_ = (option, exc) => {
  const optionExit = document.createElement('p')

  document.querySelector('.bash-command').appendChild(optionExit);

  optionExit.onclick = exc;
  optionExit.innerHTML = option;
};

const clearTyping = () => {
  document.querySelector('.terminal').innerHTML = ""
  document.querySelector('.bash-command').innerHTML = "";
};

const resetHistory_ = (history) => {
  return new Promise(async (resolve, reject) => {
      await fetch('/utilitys/users/reset-progress', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name: history })
      })
      .then(response => { response.json() })
      .then(result => { resolve(result) })
      .catch(error => reject(error));
  })
};