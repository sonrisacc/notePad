/* Small note template  */
function addNewSmallNote(color, title, body, id) {
  uId++;
  let box = document.createElement('div');
  box.className = 'box small-note';
  box.id = id || uId;
  curNoteId = id || uId;

  let noteColor = document.createElement('div');
  noteColor.className = 'note color';
  noteColor.classList.add(color);

  let noteTitle = document.createElement('div');
  noteTitle.className = 'note title';
  let titleName = document.createElement('p');
  titleName.id = 'pTitle';
  titleName.innerHTML = title;

  let editBtnContainer = document.createElement('div');
  editBtnContainer.className = 'function';
  let editBtn = document.createElement('button');
  editBtn.className = 'btn edit';
  let trashBtn = document.createElement('button');
  trashBtn.className = 'btn trash';
  let editIcon = document.createElement('i');
  editIcon.className = 'fa fa-edit';
  let trashIcon = document.createElement('i');
  trashIcon.className = 'fa fa-trash';

  trashBtn.addEventListener('click', e => {
    editModeHandler(e);
    openModalHandler(dModal);
  });

  editBtn.addEventListener('click', e => {
    editModeHandler(e);
    openModalHandler(modal);
  });

  editBtn.append(editIcon);
  trashBtn.append(trashIcon);

  editBtnContainer.append(editBtn);
  editBtnContainer.append(trashBtn);

  noteTitle.append(titleName);
  noteTitle.append(editBtnContainer);

  let noteMain = document.createElement('div');
  noteMain.className = 'main';
  let innerText = document.createElement('div');
  innerText.className = 'note inner';
  let innerTextBody = document.createElement('p');
  innerTextBody.id = 'pBody';

  innerTextBody.innerHTML = body;

  innerText.append(innerTextBody);
  noteMain.append(innerText);

  box.append(noteColor);
  box.append(noteTitle);
  box.append(noteMain);

  return box;
}
