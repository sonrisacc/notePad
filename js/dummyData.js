/* dummy data set */
const initialuId = 0;
const dummy = {
  1: { title: 'example1', body: 'example', color: 'red' },
  2: { title: 'example2', body: 'example', color: 'blue' },
  3: { title: 'example3', body: 'example', color: 'green' },
  4: { title: 'example4', body: 'example', color: 'green' },
  5: { title: 'example5', body: 'example', color: 'green' },
  6: { title: 'example6', body: 'example', color: 'green' }
};
const dummyUId = JSON.stringify(initialuId);
const dummyData = JSON.stringify(dummy);
/* dummy data set end */

/* load data from localStorage */
let storage = window.localStorage.getItem('data');
let savedNotes;

if (storage === null) {
  // if no saved data, populate with dummydata
  window.localStorage.setItem('uId', initialuId);
  window.localStorage.setItem('data', dummyData);
  savedNotes = JSON.parse(window.localStorage.getItem('data'));
} else {
  // otherwise use loaded data
  savedNotes = JSON.parse(storage);
}

// Sample data {uId:{title:xx, color:xx, body:xx}}
// load existing uIds
let preSavedNote = Object.keys(savedNotes);

// reset uId counter
let uId = JSON.parse(window.localStorage.getItem('uId'));
/* load data from localStorage end */
