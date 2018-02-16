/* Javascript */
const savedNotes = {};
const notes = document.querySelector('.notes');
const typedTitle = document.querySelector('input[name=title]');
const typedBody = document.querySelector('textarea');
const chooseColor = document.querySelector('.e-choose-color');
const colorBtns = document.querySelectorAll('.color-btn');
const modalHeaderColor = document.querySelector('.e-color');
let uId = 0;
let curChosenColor = '';
let curNoteId = -1;
let curIsInEditMode = false;

function savedToNotesData(color, title, body) {
  savedNotes[curNoteId] = {
    color,
    title,
    body
  };
}

function deleteNoteHandler() {
  let curNote = document.getElementById(curNoteId);
  notes.removeChild(curNote);
  closeModalHandler(dModal);
}

/* Clean Up Add New Note */
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
  curNoteId = uId;
}
/* Clean Up Add New Note End */

/* Edit mode related */
function editModeHandler(e) {
  curNoteId = e.target.closest('div.box').id;
  console.log('15 running', curNoteId);
  curIsInEditMode = true;
}

function toggleConditionalBtn() {
  if (curIsInEditMode) {
    conditionBtn.classList.remove('addNote');
    conditionBtn.classList.add('save');
    conditionBtn.innerHTML = 'Save';
  } else if (!curIsInEditMode) {
    conditionBtn.classList.remove('save');
    conditionBtn.classList.add('addNote');
    conditionBtn.innerHTML = 'Add';
  }
}

function setModalColor(color) {
  let curColorChoice = document.querySelector(`.color-btn.${color}`);
  curColorChoice.classList.add('selected');
  modalHeaderColor.classList.add(color);
}

function changeBtnColor(target) {
  if (!target.classList.contains('changed')) target.classList.add('changed');
}

function generateNewSmallNote() {
  let newColor = curChosenColor;
  let newTitle = typedTitle.value;
  let newBody = typedBody.value;
  let newNote = addNewSmallNote(newColor, newTitle, newBody);
  notes.append(newNote);
  savedToNotesData(newColor, newTitle, newBody);
  console.log('data saved', savedNotes);
  closeModalHandler(modal);
}

function updateSmallNote() {
  let detail = savedNotes[curNoteId];
  let newColor = curChosenColor || detail.color;
  let newTitle = typedTitle.value || detail.title;
  let newBody = typedBody.value || detail.body;

  let curNote = document.getElementById(curNoteId);
  curNote.firstElementChild.className = `note color ${newColor}`;
  curNote.querySelector('#pTitle').innerHTML = typedTitle.value;
  curNote.querySelector('#pBody').innerHTML = typedBody.value;

  savedToNotesData(newColor, newTitle, newBody);
  curIsInEditMode = false;
  closeModalHandler(modal);
  toggleConditionalBtn();
}

//chooseColor
const colorClickHandler = e => {
  if (e.target.tagName != 'BUTTON') return;
  resetChosenColor();
  e.target.classList.add('selected');
  curChosenColor = e.target.classList[1];
  modalHeaderColor.className = `e-color ${curChosenColor}`;
};
chooseColor.addEventListener('click', colorClickHandler);

const closeModalHandler = target => {
  target.style.display = 'none';
  resetInputField();
  curIsInEditMode = false;
};

const openModalHandler = target => {
  if (curIsInEditMode) {
    let detail = savedNotes[curNoteId];
    toggleConditionalBtn();
    setModalColor(detail.color);
    typedTitle.value = detail.title;
    typedBody.value = detail.body;
    target.addEventListener('input', () => changeBtnColor(conditionBtn));
  }
  target.style.display = 'block';
};

const openNewNoteBtn = document.querySelector('.newNote');
const modal = document.getElementById('addingPage');
openNewNoteBtn.addEventListener('click', () => openModalHandler(modal));

const closeModalBtn = document.querySelector('.cancelBtn');
closeModalBtn.addEventListener('click', () => closeModalHandler(modal));

const conditionBtn = document.getElementById('modalFooter').lastElementChild;
conditionBtn.addEventListener('click', e => {
  if (e.target.innerText === 'Add') generateNewSmallNote();
  if (e.target.innerText === 'Save') updateSmallNote();
});

const openDeleNoteBtn = document.querySelector('.trash');
const dModal = document.getElementById('deleteNote');
openDeleNoteBtn.addEventListener('click', e => {
  openModalHandler(dModal);
  editModeHandler(e);
});

const deleNoteBtn = document.querySelector('.d-button.blueBtn');
deleNoteBtn.addEventListener('click', deleteNoteHandler);

const colseDeleNoteBtn = document.querySelector('.d-button.cancelBtn');
colseDeleNoteBtn.addEventListener('click', () => closeModalHandler(dModal));

/* Small note template  */
function addNewSmallNote(color, title, body) {
  console.log('163', uId);
  uId += 1;
  let box = document.createElement('div');
  box.className = 'box small-note';
  box.id = uId;
  curNoteId = uId;

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
