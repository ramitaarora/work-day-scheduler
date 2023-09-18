var currentDay = $('#currentDay');
var today = dayjs().format('dddd, MMMM D');
var currentTime = Number(dayjs().format('HH'));
var saveButton = $('.saveBtn');
var appointment = $('#appointment-added');

var timeBlock = $('.time-block');
var timeRow = timeBlock.children('div');
var textArea = timeBlock.children('textarea');

$(function () {
  appointment.addClass('hidden');

  for (let i=0; i < timeBlock.length; i++) {
    if (localStorage.getItem(timeBlock[i].id)) {
      textArea[i].value = localStorage.getItem(timeBlock[i].id);
    }
  }

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

  $('.saveBtn').on('click', 'i', function(event) {
    event.preventDefault();
    var storageID = $(this).parent().parent().attr('id');
    var textValue = $(this).parent().parent().children('textarea').val();

    if (textValue) {
      localStorage.setItem(storageID, textValue);
      appointment.removeClass('hidden');
    }
  })

  $('.saveBtn').on('click', function(event) {
    event.preventDefault();
    var storageID = $(this).parent().attr('id');
    var textValue = $(this).parent().children('textarea').val();

    if (textValue) {
      localStorage.setItem(storageID, textValue);
      appointment.removeClass('hidden');
    }
  })

  currentDay.text(today);

  function setOrdinal() {
    if (today.slice(-1) == 1) {
      currentDay.append('st');
    } else if (today.slice(-1) == 2) {
      currentDay.append('nd');
    } else if (today.slice(-1) == 3) {
      currentDay.append('rd');
    } else {
      currentDay.append('th');
    }
  }

  setOrdinal();

});