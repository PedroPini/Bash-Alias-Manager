const fs = require('fs');
const os = require('os');
const path = require('path');

// Determine the active shell
function getShellInfo() {
  const shell = process.env.SHELL.includes('zsh') ? 'zsh' : 'bash';
  const rcFilePath = shell === 'zsh' ? path.join(os.homedir(), '.zshrc') : path.join(os.homedir(), '.bashrc');
  const reloadCommand = shell === 'zsh' ? 'source ~/.zshrc' : 'source ~/.bashrc';
  return { shell, rcFilePath, reloadCommand };
}

module.exports = { getShellInfo };