const typing_ = (phrase, chapter = false) => {
  const delay = 100;
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