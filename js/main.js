/* Javascript */

let addNoteBtn = document.querySelector('.add');
let modal = document.getElementById('addingPage');
addNoteBtn.addEventListener('click', () => {
  modal.style.display = 'block';
});

let deleNoteBtn = document.querySelector('.trash');
let dModal = document.getElementById('deleteNote');
deleNoteBtn.addEventListener('click', () => {
  dModal.style.display = 'block';
});

let cancelBtn = document.querySelector('.cancelBtn');
cancelBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

let cancelDBtn = document.querySelector('.d-button.cancelBtn');
cancelDBtn.addEventListener('click', () => {
  dModal.style.display = 'none';
});
