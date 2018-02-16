/* Javascript */
const savedNotes = {};
const notes = document.querySelector('.notes');
const typedTitle = document.querySelector('input[name=title]');
const typedBody = document.querySelector('textarea');
const chooseColor = document.querySelector('.e-choose-color');
const colorBtns = document.querySelectorAll('.color-btn');
const uId = 0;
let curChosenColor = '';
let curNoteId = -1;
let curIsInEditMode = false;

function editModeHandler(e) {
  curNoteId = e.target.closest('div.box').id;
  console.log('15 running', curNoteId);
  curIsInEditMode = true;
}

function deleteNoteHandler() {
  let curNote = document.getElementById(curNoteId);
  notes.removeChild(curNote);
  closeModalHandler(dModal);
}
function resetChosenColor() {
  //reset color
  colorBtns.forEach(cur => {
    cur.classList.remove('selected');
  });
}

function resetInputField() {
  resetChosenColor();
  typedTitle.value = '';
  typedBody.value = '';
  curChosenColor = '';
  curNoteId = -1;
}

function savedToNotesData(color, title, body) {
  savedNotes[curNoteId] = {
    color,
    title,
    body
  };
}

//chooseColor
const colorClickHandler = e => {
  if (e.target.tagName != 'BUTTON') return;
  resetChosenColor();
  e.target.classList.add('selected');
  curChosenColor = e.target.classList[1];
};
chooseColor.addEventListener('click', colorClickHandler);

const closeModalHandler = target => {
  target.style.display = 'none';
  resetInputField();
};

const openModalHandler = target => {
  if (curIsInEditMode) {
    curIsInEditMode = false;
    let detail = savedNotes[curNoteId];
    //add color
    let color = detail.color;
    let curColorChoice = document.querySelector(`.color-btn.${color}`);
    curColorChoice.classList.add('selected');
    typedTitle.value = detail.title;
    typedBody.value = detail.body;
  }
  target.style.display = 'block';
};

let openNewNoteBtn = document.querySelector('.newNote');
let modal = document.getElementById('addingPage');
openNewNoteBtn.addEventListener('click', () => openModalHandler(modal));

let closeModalBtn = document.querySelector('.cancelBtn');
closeModalBtn.addEventListener('click', () => closeModalHandler(modal));

let addNoteBtn = document.querySelector('.addNote');
addNoteBtn.addEventListener('click', () => {
  let newColor = curChosenColor;
  let newTitle = typedTitle.value;
  let newBody = typedBody.value;
  let newNote = addNewSmallNote(newColor, newTitle, newBody);
  notes.append(newNote);
  savedToNotesData(newColor, newTitle, newBody);
  console.log('data saved', savedNotes);
  closeModalHandler(modal);
});

let openDeleNoteBtn = document.querySelector('.trash');
let dModal = document.getElementById('deleteNote');
openDeleNoteBtn.addEventListener('click', e => {
  openModalHandler(dModal);
  editModeHandler(e);
});

let deleNoteBtn = document.querySelector('.d-button.blueBtn');
deleNoteBtn.addEventListener('click', deleteNoteHandler);

let colseDeleNoteBtn = document.querySelector('.d-button.cancelBtn');
colseDeleNoteBtn.addEventListener('click', () => closeModalHandler(dModal));

function addNewSmallNote(color, title, body) {
  let uniqueId = uId + 1;
  let box = document.createElement('div');
  box.className = 'box small-note';
  box.id = uniqueId;
  curNoteId = box.id;

  let noteColor = document.createElement('div');
  noteColor.className = 'note color';
  noteColor.classList.add(color);

  let noteTitle = document.createElement('div');
  noteTitle.className = 'note title';
  let titleName = document.createElement('p');
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
  innerTextBody.innerHTML = body;

  innerText.append(innerTextBody);
  noteMain.append(innerText);

  box.append(noteColor);
  box.append(noteTitle);
  box.append(noteMain);

  return box;
}
