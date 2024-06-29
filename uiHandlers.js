const { loadAliases, addAlias, removeAlias } = require('./aliasManager');

function setupUI() {
  const aliasForm = document.getElementById('alias-form');
  const aliasList = document.getElementById('alias-list');

  aliasForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const aliasNameInput = document.getElementById('alias-name');
    const aliasCommandInput = document.getElementById('alias-command');
    const aliasName = aliasNameInput.value;
    const aliasCommand = aliasCommandInput.value;
    addAlias(aliasName, aliasCommand, () => {
      loadAliasesUI();
      aliasNameInput.value = '';
      aliasCommandInput.value = '';
      alert('Alias added. Please source your shell to apply changes.'); // Notify user to source their shell
    });
  });

  function loadAliasesUI() {
    loadAliases((aliases) => {
      aliasList.innerHTML = '';
      aliases.forEach(alias => {
        const aliasItem = document.createElement('div');
        aliasItem.className = 'box'; // Bulma box class for each alias item

        const content = document.createElement('div');
        content.className = 'content';
        content.style.display = 'flex'; // Use flexbox layout
        content.style.justifyContent = 'space-between'; // Space between text and button
        content.style.alignItems = 'center'; // Align items vertically in the center

        const text = document.createElement('span'); // Create a span for the text
        text.textContent = `${alias.name}=${alias.command}`;
        content.appendChild(text); // Append the text span to the content div

        const removeButton = document.createElement('button');
        removeButton.className = 'button is-small is-danger'; // Bulma button classes
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', () => {
          removeAlias(alias.name, loadAliasesUI)
          alert('Alias removed. Please source your shell to apply changes.'); // Notify user to source their shell
        });

        content.appendChild(removeButton); // Append the remove button to the content div
        aliasItem.appendChild(content); // Append the content div to the alias item div
        aliasList.appendChild(aliasItem); // Append the alias item to the alias list
      });
    });
}
  

  loadAliasesUI();
}

module.exports = { setupUI };