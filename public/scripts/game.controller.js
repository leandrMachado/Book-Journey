const input = document.querySelector("input");
let inventory = ["mapa"];

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

const readHistory = () => {};

document.addEventListener("keydown", async (e) => {
  if (e.keyCode === 13 && input.value) {
    if (input.value in commands) commands[input.value]();
    else
      await typing(
        `→ Command not found: ${input.value}. Type help for a list of supported commands`
      );
    input.value = "";
  }
});
