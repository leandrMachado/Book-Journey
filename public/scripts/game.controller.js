let command = "";
let inventory = ["mapa"];
let chapterIndex = 2; // init 0
let historyIndex = 0;

const commands = {
  move: () => readChapter(),
  look: () => {},
  examine: () => {},
  inventory: () => inventoryLoad(),
  help: async () => {
    await typing(
      "Commands: " + JSON.stringify(Object.keys(commands)).replace(/["']/g, "")
    );
  },
};
