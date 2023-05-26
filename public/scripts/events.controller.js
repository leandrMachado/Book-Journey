const source = new Audio("/assets/source.wav");
const typing = (phrase, chapter = false) => {
    const delay = 50;
    let charIndex = 0;
    source.volume = .1
    source.play();
  
    return new Promise((resolve) => {
      const commandExit = document.createElement("p");

      if (chapter) 
        commandExit.classList.add("chapter")

      document.getElementById("bash-exit").appendChild(commandExit);
  
      const typingDelay = setInterval(() => {
        commandExit.innerHTML += phrase[charIndex];
        charIndex++;
  
        if (charIndex >= phrase.length) {
          clearInterval(typingDelay);
          resolve();
        }
      }, delay);

      window.onkeydown = (event) => {
        if (event.which == 32)
          clearInterval(typingDelay);
          commandExit.innerHTML = "";
          commandExit.innerHTML = phrase;
          resolve();
      }
    });
    
};

const inventoryLoad = async () => {
    if (inventory.length === 0)
        await typing("Nao existem items no inventario");
    else 
        await typing("Inventory: " + JSON.stringify(inventory).replace(/["']/g, ''));
}