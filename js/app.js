window.App = {};

// そのまま Backbone.Events を代入すると
// mediator を変更することで Backbone.Events が変わってしまう
// Backbone.Events をディープコピーするために extend を使う
App.mediator = _.extend({}, Backbone.Events);

$(function(){
  var schedules = new App.Schedules();

  var calendarView = new App.CalendarView({
    el: '.calendar',
    collection: schedules
  });

  var formDialogView = new App.FormDialogView({
    el: '.dialog',
    collection: schedules
  });

  var calendarControlView = new App.CalendarControlView({
    el: '.calendar-control',
    collection: schedules
  });
});
