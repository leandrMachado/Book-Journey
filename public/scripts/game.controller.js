let command = '';
let inventory = ['mapa'];
let chapterIndex = 2; // init 0
let historyIndex = 0;

const commands = {
    "move": () => readChapter(),
    "look": () => {},
    "examine": () => {},
    "inventory": () => inventoryLoad(),
    "help": async () => {
        await typing("Commands: " + JSON.stringify(Object.keys(commands)).replace(/["']/g, ''))
    }
}

let chapter = 0;
let indexLine = 0;

const readChapter = async () => {
    const history = await historyRead();
    console.log(chapter)

    for (let index = chapter; index < history.length; index++) {

        if (history[index] === `Capítulo - ${chapter+1}`)
            await typing(history[index], true);
        else if (history[index] === "move()") {
            chapter++;
            break;
        }
        else 
            await typing(history[index]);
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
                commands[command]();
                command = '';
                document.getElementById('bash').innerHTML = command;
            }
            else {
                command = '';
                document.getElementById('bash').innerHTML = command;
                console.log('Comando nao encontrado escrever help para ter mais!')
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

if (window.innerWidth < 750) 
    typing('This website is not compatible with mobile devices...');
else
    typing('Digite (move) para iniciar ou (help) a mostrar comandos');