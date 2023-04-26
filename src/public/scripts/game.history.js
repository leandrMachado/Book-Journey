let command = '';
let items = [];
let achievements = [];

new KeyPressListener((key) => {
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
            // readCommand(command)

            if (command in commands) {
                commands[command]();
                
                const commandExit = document.createElement("p");
                commandExit.innerHTML = command;

                document.getElementById("bash-exit").appendChild(commandExit);

                command = '';
                document.getElementById('bash').innerHTML = command;
            }
            else {
                command = '';
                document.getElementById('bash').innerHTML = command;
                typing('Command not found!')
            }
            
            break;
        }
        default: {
            const capsLockOn = event.getModifierState('CapsLock');
    
            if (capsLockOn) {
                command += String.fromCharCode(key).toUpperCase();
            } else {
                command += String.fromCharCode(key).toLowerCase();
            }
            
            document.getElementById('bash').innerHTML = command;
            break;
        }
    }
})

let indexHistory = 0

const commands = {
    'go': () => storyTeller(),
    'introductions': () => {

    }
}


const storyTeller = async () => {
    let history = await loadStory();

    let index = indexHistory;

    for (index = indexHistory; index < history.length; index++) {
        const step = history[index];

        if (step.setState) {
            await typing(step.text);
        }
        else {
            indexHistory = index;
            await typing(step.text)
            for (let op = 0; op < step.optins.length; op++) {

                commands[step.optins[op].option] = () => {
                    console.log(step.optins[op])
                    indexHistory++;
                    storyTeller();
                }

                await typing(`${op + 1}. ${step.optins[op].option}`)
                
            }
            break;
        }
    }
    
}

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
  

const loadStory = async () => {
    return new Promise((resolve, reject) => {
        fetch('/data/history.json')
            .then(response => response.json())
            .then(historyData => resolve(historyData))
            .catch(error => reject(error));
    });
}

typing('To resume execution, type go.  Other input will terminate the job.');