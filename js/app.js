window.App = {};

$(function(){
  var schedules = new App.Schedules();

  // dummy data
  schedules.add([
    {title: 'Backbone.js ハンズオン', datetime: moment('2013-10-24 9:30')},
    {title: 'Backbone.js ハンズオン', datetime: moment('2013-10-25 9:30')},
    {datetime: moment('2013-09-30 8:00')}
  ])

  var createFormView = new App.CreateFormView({
    el: '.createForm', // this に入ってくるのかー!!
    collection: schedules
  });

  var calendarView = new App.CalendarView({
    el: '.calendar',
    collection: schedules
  });

  var formDialogView = new App.FormDialogView({
    el: '.dialog',
    collection: schedules
  });
  App.formDialogView = formDialogView;

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
