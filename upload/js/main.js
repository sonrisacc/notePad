/* Javascript */
// append data to dom

preSavedNote.forEach(cur => {
  console.log('running');
  console.log('cur', cur);
  let color = savedNotes[cur].color;
  let title = savedNotes[cur].title;
  let body = savedNotes[cur].body;
  notes.append(addNewSmallNote(color, title, body, cur));
});

/* Edit mode Modal */
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
/* Edit mode Modal End */

/* Delete mode Modal */
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
/* Delete mode Modal End */
