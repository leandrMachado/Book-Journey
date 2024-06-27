const input = document.querySelector("input");
let inventory = ["mapa"];
let line = 0;
let chapter = 1;

const commands = {
  move: () => readHistory(),
  look: () => readHistory(),
  examine: () => {},
  inventory: () => inventoryLoad(),
  help: async () => {
    await typing(
      "→ Commands: " +
        JSON.stringify(Object.keys(commands)).replace(/["']/g, "")
    );
  },
};

const readHistory = async () => {
  const history = await historyRead();
  
  for (let i = line; i <= history.length; i++) {
    if (history[i] === `Capítulo - ${chapter}`)
     await typing(history[i], true)
    else if (history[i] === "move()") {
      chapter++
      line++
      break
    }
    else {
      line++
      await typing("→ " + history[i])
    }

  }
};

document.addEventListener("keydown", async (e) => {
  if (e.keyCode === 13 && input.value) {
    if (input.value.toLowerCase() in commands) commands[input.value.toLowerCase()]();
    else
      await typing(
        `→ Command not found: ${input.value}. Type help for a list of supported commands`
      );
    input.value = "";
  }
});