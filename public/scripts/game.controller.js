let command = '';
let items = [];
let achievements = [];

const dontKnowWhatAnswer = [
    "Hmm.... I don't understand.",
    "Can you answer again I don't understand!"
]

const commands = {
    'clear': () => clearTerminal(),
    'cls': () => clearTerminal(),
}

const clearTerminal = () => {
    const exit = document.getElementById('bash-exit');
    while (exit.firstChild) {
        exit.removeChild(exit.firstChild);
    }
}

new KeyPressListener(async (key) => {
    switch (key) {
        case 8: {
            command = command.slice(0, -1);
            document.getElementById('bash').innerHTML = command;
            break;
        }
        case 32: {
            command += ' ';
            document.getElementById('bash').innerHTML = command;
            break;
        }
        case 13: {
            if (command in commands) {
                if (command === 'cls' || command === 'clear') {
                    commands[command]();
                }
                else {
                    commands[command]();
                    const commandExit = document.createElement("p");
                    commandExit.innerHTML = command;
                    document.getElementById("bash-exit").appendChild(commandExit);
                }
                
                command = '';
                document.getElementById('bash').innerHTML = command;
            }
            else {
                const indexDontKnowWhatAnswer =  Math.floor(Math.random() * (dontKnowWhatAnswer.length - 0));
                const temporaryCommand = command;
                command = '';
                document.getElementById('bash').innerHTML = command;

                await typing(`user: ${temporaryCommand}`)
                await typing(`server: ${dontKnowWhatAnswer[indexDontKnowWhatAnswer]}`);
            }
            
            break;
        }
        default: {
            command += String.fromCharCode(key).toLowerCase();
            document.getElementById('bash').innerHTML = command;
            break;
        }
    }
})

const typing = (phrase) => {
    const delay = 50;
    let charIndex = 0;
  
    return new Promise((resolve) => {
      const commandExit = document.createElement("p");
      document.getElementById("bash-exit").appendChild(commandExit);
  
      const typingDelay = setInterval(() => {
        commandExit.innerHTML += phrase[charIndex];
        charIndex++;
  
        if (charIndex >= phrase.length) {
          clearInterval(typingDelay);
          resolve();
        }
      }, delay);
    });
};

const initializeText = [    'Initializing...',    'Started, status OK.'];

const initializeApp = async () => {
    for (const tst of initializeText) {
        await typing(tst);
    }
}

initializeApp();

if (window.innerWidth < 750) typing('This website is not compatible with mobile devices...');