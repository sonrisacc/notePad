/* Most often used nodes */
const notes = document.querySelector('.notes');
const typedTitle = document.querySelector('input[name=title]');
const typedBody = document.querySelector('textarea');
const chooseColor = document.querySelector('.e-choose-color');
const colorBtns = document.querySelectorAll('.color-btn');
const modalHeaderColor = document.querySelector('.e-color');
/* Most often used nodes end*/

/* Cur editing note state storage */
let curIsInEditMode = false;
let curChosenColor = '';
let curNoteId = -1;
/* Cur note state  end */

/**********************/
/* helperFunctionStart */
/**********************/

/* Update global storage */
const saveData = (data, id) => {
  window.localStorage.setItem('data', JSON.stringify(savedNotes));
  if (!!id) window.localStorage.setItem('uId', JSON.stringify(id));
};

const savedToNotesData = (color, title, body) => {
  savedNotes[curNoteId] = {
    color,
    title,
    body
  };
  saveData(savedNotes, uId);
};

const deleteNoteHandler = () => {
  let curNote = document.getElementById(curNoteId);
  delete savedNotes[curNoteId];
  saveData(savedNotes);
  notes.removeChild(curNote);
  closeModalHandler(dModal);
};
/* Update global storage  end*/

/* Reset filed related */
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
/* Reset filed related end */

/* Edit mode related */
const editModeHandler = e => {
  // editing existing note mode On
  curNoteId = e.target.closest('div.box').id;
  curIsInEditMode = true;
};

const toggleConditionalBtn = () => {
  if (curIsInEditMode) {
    // if editing existing note
    conditionBtn.classList.remove('addNote');
    conditionBtn.classList.add('save');
    conditionBtn.innerHTML = 'Save';
  } else if (!curIsInEditMode) {
    // if adding now note
    conditionBtn.classList.remove('save');
    conditionBtn.classList.add('addNote');
    conditionBtn.innerHTML = 'Add';
  }
};

const setModalColor = color => {
  // set modal top bar's color
  let curColorChoice = document.querySelector(`.color-btn.${color}`);
  curColorChoice.classList.add('selected');
  modalHeaderColor.classList.add(color);
};

/* Toggle save btn color */
const changeBtnColor = target => {
  if (!target.classList.contains('changed')) target.classList.add('changed');
};
const resetBtnColor = target => {
  if (target.classList.contains('changed')) target.classList.remove('changed');
};
/* Toggle save btn color end*/

/* Adding new note */
const generateNewSmallNote = () => {
  // preset default value
  let newColor = curChosenColor || 'blue';
  let newTitle = typedTitle.value || 'Sample note';
  let newBody = typedBody.value || 'click me to edit!!';

  // use small note template to generate new note
  let newNote = addNewSmallNote(newColor, newTitle, newBody);
  notes.append(newNote);

  // save new note
  savedToNotesData(newColor, newTitle, newBody);

  // close and reset input filed
  closeModalHandler(modal);
};
/* Adding new note End*/

/* Update existing note */
const updateSmallNote = () => {
  // preset default value
  let detail = savedNotes[curNoteId];
  let newColor = curChosenColor || detail.color;
  let newTitle = typedTitle.value || detail.title;
  let newBody = typedBody.value || detail.body;

  // update cur note
  let curNote = document.getElementById(curNoteId);
  curNote.firstElementChild.className = `note color ${newColor}`;
  curNote.querySelector('#pTitle').innerHTML = typedTitle.value;
  curNote.querySelector('#pBody').innerHTML = typedBody.value;

  // save note
  savedToNotesData(newColor, newTitle, newBody);

  // close and exit edit-mode
  closeModalHandler(modal);
  curIsInEditMode = false;
  toggleConditionalBtn();
};
/* Update existing note end*/

/* choose note color */
const colorClickHandler = e => {
  if (e.target.tagName != 'BUTTON') return;
  // reset existing color
  resetChosenColor();
  // if changed, update "save" btn color
  changeBtnColor(conditionBtn);
  // choose and update new color selection
  e.target.classList.add('selected');
  curChosenColor = e.target.classList[1];
  modalHeaderColor.className = `e-color ${curChosenColor}`;
};
chooseColor.addEventListener('click', colorClickHandler);
/* choose note color end */
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
