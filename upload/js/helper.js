const notes = document.querySelector('.notes');
const typedTitle = document.querySelector('input[name=title]');
const typedBody = document.querySelector('textarea');
const chooseColor = document.querySelector('.e-choose-color');
const colorBtns = document.querySelectorAll('.color-btn');
const modalHeaderColor = document.querySelector('.e-color');

// cur note state
let curChosenColor = '';
let curNoteId = -1;
let curIsInEditMode = false;

const savedToNotesData = (color, title, body) => {
  // update global storage
  savedNotes[curNoteId] = {
    color,
    title,
    body
  };
  window.localStorage.setItem('data', JSON.stringify(savedNotes));
  window.localStorage.setItem('uId', JSON.stringify(uId));
};

const deleteNoteHandler = () => {
  let curNote = document.getElementById(curNoteId);
  delete savedNotes[curNoteId];
  window.localStorage.setItem('data', JSON.stringify(savedNotes));
  notes.removeChild(curNote);
  closeModalHandler(dModal);
};

/* Clean Up Add New Note */
const resetChosenColor = () => {
  //reset color
  colorBtns.forEach(cur => {
    cur.classList.remove('selected');
  });
};

const resetInputField = () => {
  resetChosenColor();
  typedTitle.value = '';
  typedBody.value = '';
  curChosenColor = '';
  curNoteId = uId;
};
/* Clean Up Add New Note End */

/* Edit mode related */
const editModeHandler = e => {
  curNoteId = e.target.closest('div.box').id;
  curIsInEditMode = true;
};

const toggleConditionalBtn = () => {
  if (curIsInEditMode) {
    conditionBtn.classList.remove('addNote');
    conditionBtn.classList.add('save');
    conditionBtn.innerHTML = 'Save';
  } else if (!curIsInEditMode) {
    conditionBtn.classList.remove('save');
    conditionBtn.classList.add('addNote');
    conditionBtn.innerHTML = 'Add';
  }
};

const setModalColor = color => {
  let curColorChoice = document.querySelector(`.color-btn.${color}`);
  curColorChoice.classList.add('selected');
  modalHeaderColor.classList.add(color);
};

const changeBtnColor = target => {
  if (!target.classList.contains('changed')) target.classList.add('changed');
};
const resetBtnColor = target => {
  if (target.classList.contains('changed')) target.classList.remove('changed');
};

const generateNewSmallNote = () => {
  let newColor = curChosenColor || 'blue';
  let newTitle = typedTitle.value || 'Sample note';
  let newBody = typedBody.value || 'click me to edit!!';
  let newNote = addNewSmallNote(newColor, newTitle, newBody);
  notes.append(newNote);
  savedToNotesData(newColor, newTitle, newBody);
  closeModalHandler(modal);
};

const updateSmallNote = () => {
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
};

//chooseColor
const colorClickHandler = e => {
  if (e.target.tagName != 'BUTTON') return;
  resetChosenColor();
  changeBtnColor(conditionBtn);
  e.target.classList.add('selected');
  curChosenColor = e.target.classList[1];
  modalHeaderColor.className = `e-color ${curChosenColor}`;
};
chooseColor.addEventListener('click', colorClickHandler);

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

const closeModalHandler = target => {
  target.style.display = 'none';
  resetInputField();
  curIsInEditMode = false;
  toggleConditionalBtn();
  resetBtnColor(conditionBtn);
};

/* helperFunctionEnd */
