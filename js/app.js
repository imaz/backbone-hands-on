window.App = {};

$(function(){
  var schedules = new App.Schedules();

  var createFormView = new App.CreateFormView({
    el: '.createForm', // this に入ってくるのかー!!
    collection: schedules
  });

  var calendarView = new App.CalendarView({
    el: '.calendar',
    collection: schedules
  });

  $('.calendar-prevBtn').on('click', function(){
    calendarView.toPrev();
  });

  $('.calendar-nextBtn').on('click', function(){
    calendarView.toNext();
  });

  $('.calendar-todayBtn').on('click', function(){
    calendarView.toToday();
  });
});
