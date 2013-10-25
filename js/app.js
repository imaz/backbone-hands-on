window.App = {};

// そのまま Backbone.Events を代入すると
// mediator を変更することで Backbone.Events が変わってしまう
// Backbone.Events をディープコピーするために extend を使う
App.mediator = _.extend({}, Backbone.Events);

$(function(){
  var schedules = new App.Schedules();

  // dummy data
  schedules.add([
    {title: 'Backbone.js ハンズオン', datetime: moment('2013-10-24 9:30')},
    {title: 'Backbone.js ハンズオン', datetime: moment('2013-10-25 9:30')},
    {datetime: moment('2013-09-30 8:00')}
  ])

  var calendarView = new App.CalendarView({
    el: '.calendar',
    collection: schedules
  });

  var formDialogView = new App.FormDialogView({
    el: '.dialog',
    collection: schedules
  });
  App.formDialogView = formDialogView;

  var calendarControlView = new App.CalendarControlView({
    el: '.calendar-control',
    collection: schedules
  });
});
