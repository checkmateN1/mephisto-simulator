function createSelectGeneration(names) {
  if (names && names.length) {
    const select = document.getElementById('select-generation');
    names.forEach(name => {
      const option = document.createElement('option');
      option.value = name;
      option.text = name;

      select.appendChild(option);
    });
  }
}

function selectGeneration(selectObject) {
  const generation = selectObject.value;

  ioClient.emit('setGeneration', generation);
}