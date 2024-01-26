let terminalOutput;

const app = () => {
  window.userInput = document.getElementById("userInput");
  terminalOutput = document.getElementById("terminalOutput");
  document.getElementById("dummyKeyboard").focus();

  document.addEventListener('keydown', keyEvent);
  document.addEventListener('keydown', backSpaceKeyEvent);
};

// Initialize when DOM is fully loaded
document.addEventListener("DOMContentLoaded", app);

function keyEvent(e) {
  const userInput = window.userInput;

  if (e.key === "Enter") {
    e.preventDefault(); 
    execute(userInput.textContent);
    userInput.textContent = "";
  } else if (e.key.length === 1) { // Ensure that only printable characters are added
    userInput.textContent += e.key;
  }
}

function backSpaceKeyEvent(e) {
  const userInput = window.userInput;

  if (e.key === 'Backspace') {
    e.preventDefault();  
    userInput.textContent = userInput.textContent.slice(0, -1);
  }
}

function execute(input) {
  let output;
  input = input.toLowerCase();

  if (input.length === 0) {
    return;
  }

  else if (input === 'clear') {
    clearTerminal();
  }

  // Additional command handling logic...
  output = `<div class="terminal-line"><span class="success">➜</span> <span class="directory">~</span> ${input}</div>`;
  if (!COMMANDS.hasOwnProperty(input)) {
    output += `<div class="terminal-line">no such command: <span class="output">"${input}"</span></div>`;
  } else {
    output += `<div class="output"> ${COMMANDS[input]} </div>`;
  }

  terminalOutput.innerHTML += `<div class="terminal-line">${output}</div>`;
  terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

function clearTerminal() {
  terminalOutput.innerHTML = "";
  displayHelp();
}

function displayHelp() {
  const helpOutput = COMMANDS['help'];
  terminalOutput.innerHTML += `<div class="terminal-line">${helpOutput}</div>`;
}

const COMMANDS = {
  help:
    '[amolmendonca] ~ $ Supported commands: ["<span class="code">about</span>", "<span class="code">experience</span>", "<span class="code">education</span>", "<span class="code">skills</span>", "<span class="code">contact</span>", "<span class = code>clear</span>"]',
  about:
    "[amolmendonca] ~ $ Hello! I'm Amol Mendonca. I’m a 19 year old developer with expertise in full-stack development!",
  skills:
    '[amolmendonca] ~ $ <span class="code">Languages:</span> Swift, SwiftUI, HTML, CSS, JavaScript, C++, Java, Python, R',
  education:
    "[amolmendonca] ~ $ Bachelors of Science in Computer Science @ <span class='umich'>University of Michigan</span> - <span class = 'ann'>Ann Arbor</span>",
  experience:
    "[amolmendonca] ~ $ I'm currently working on a startup - MediGate, with 2 of my best friends. Would love to chat if you're interested in learning more!",
  contact:
    '[amolmendonca] ~ $ You can contact me on: <span class="code">amolm@umich.edu</span> or <span class="code">(248)-832-3029 </span>',
  clear: 
    ' '
};

// Rest of your code...
