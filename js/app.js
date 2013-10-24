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
});
