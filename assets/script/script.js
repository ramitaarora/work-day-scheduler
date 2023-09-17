var currentDay = $('#currentDay');
var today = dayjs().format('dddd, MMMM, D'); // not recognizing ordinal 'Do'
var currentTime = Number(dayjs().format('HH'));
var saveButton = $('.saveBtn');
var appointment = $('#appointment-added');

var timeBlock = $('.time-block');
var timeRow = timeBlock.children('div');
var textArea = timeBlock.children('textarea');

// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

$(function () {
  appointment.addClass('hidden');

  for (let i=0; i < timeBlock.length; i++) {
    if (localStorage.getItem(timeBlock[i].id)) {
      textArea[i].value = localStorage.getItem(timeBlock[i].id);
    }
  }

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?

  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?

  $('.saveBtn').on('click', 'i', function(event) {
    event.preventDefault();
    var storageID = $(this).parent().parent().attr('id');
    var textValue = $(this).parent().parent().children('textarea').val();

    if (textValue) {
      localStorage.setItem(storageID, textValue);
      appointment.removeClass('hidden');
    }
  })

  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?

  for (let i=0; i < timeRow.length; i++) {
    var timeSlice = Number((timeRow[i].parentElement.id).slice(5))
    if (timeSlice === currentTime) {
      (timeRow[i].parentElement).setAttribute('class', 'row time-block present');
    }
    if (timeSlice < currentTime) {
      (timeRow[i].parentElement).setAttribute('class', 'row time-block past');
    }
    if (timeSlice > currentTime) {
      (timeRow[i].parentElement).setAttribute('class', 'row time-block future');
    }
  }
  // TODO: Add code to display the current date in the header of the page.

  currentDay.text(today);
});