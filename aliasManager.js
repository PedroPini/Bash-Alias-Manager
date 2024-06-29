const fs = require('fs');
const { exec } = require('child_process');
const { getShellInfo } = require('./utils');

function loadAliases(callback) {
  const { rcFilePath } = getShellInfo();
  fs.readFile(rcFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading rc file: ${err.message}`);
      return;
    }
    const aliases = data.split('\n')
      .filter(line => line.startsWith('alias'))
      .map(line => {
        const parts = line.split('=');
        return {
          name: parts[0].replace('alias ', '').trim(),
          command: parts[1].replace(/"/g, '').trim()
        };
      });
    callback(aliases);
  });
}

function addAlias(name, command, callback) {
  const { rcFilePath, shell } = getShellInfo();
  const aliasLine = `alias ${name}='${command}'\n`;

  // Append the alias to the rc file
  fs.appendFile(rcFilePath, aliasLine, err => {
    if (err) {
      console.error(`Error appending alias: ${err.message}`);
      callback(err);
      return;
    }

    console.log(`Alias appended successfully.`);

    // Source the rc file to activate the alias
    exec(`source ${rcFilePath}`, { shell }, (err, stdout, stderr) => {
      if (err) {
        console.error(`Error sourcing rc file: ${stderr}`);
        callback(err);
        return;
      }

      console.log(`Alias added and sourced successfully.`);
      callback(null, `Alias ${name} added and sourced. It is now active.`);
    });
  });
}

function removeAlias(name, callback) {
  const { rcFilePath, shell } = getShellInfo();
  fs.readFile(rcFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading rc file: ${err.message}`);
      return;
    }
    const newData = data.split('\n')
      .filter(line => !line.startsWith(`alias ${name}=`))
      .join('\n');

    fs.writeFile(rcFilePath, newData, err => {
      if (err) {
        console.error(`Error writing rc file: ${err.message}`);
        callback(err);
        return;
      }

      console.log(`Alias removed successfully.`);

      // Source the rc file to deactivate the alias
      exec(`source ${rcFilePath}`, { shell }, (err, stdout, stderr) => {
        if (err) {
          console.error(`Error sourcing rc file: ${stderr}`);
          callback(err);
          return;
        }

        console.log(`Alias removed and sourced successfully.`);
        callback(null, `Alias ${name} removed and sourced. It is now deactivated.`);
      });
    });
  });
}

module.exports = { loadAliases, addAlias, removeAlias };
