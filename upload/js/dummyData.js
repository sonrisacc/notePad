const dummy = {
  1: { title: 'example1', body: 'example', color: 'red' },
  2: { title: 'example2', body: 'example', color: 'blue' },
  3: { title: 'example3', body: 'example', color: 'green' },
  4: { title: 'example4', body: 'example', color: 'green' },
  5: { title: 'example5', body: 'example', color: 'green' },
  6: { title: 'example6', body: 'example', color: 'green' }
}; //need to save uId as well;
const initialuId = 0;
let dummyUId = JSON.stringify(initialuId);
let dummyData = JSON.stringify(dummy);

let storage = window.localStorage.getItem('data');
let savedNotes;

// if no saved data, add dummydata
if (storage === null) {
  window.localStorage.setItem('uId', initialuId);
  window.localStorage.setItem('data', dummyData);
  savedNotes = JSON.parse(window.localStorage.getItem('data'));
} else {
  savedNotes = JSON.parse(storage);
}

let preSavedNote = Object.keys(savedNotes);
let uId = JSON.parse(window.localStorage.getItem('uId'));

console.log(preSavedNote, uId);
