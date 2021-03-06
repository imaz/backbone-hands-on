window.App = {};

// そのまま Backbone.Events を代入すると
// mediator を変更することで Backbone.Events が変わってしまう
// Backbone.Events をディープコピーするために extend を使う
// Chrome Developer tools > Resources tab > Local Storage で確認できる
App.mediator = _.extend({}, Backbone.Events);

$(function(){
  var Router = Backbone.Router.extend({
    initialize: function(){
      var schedules = new App.Schedules();
      schedules.fetch();

      this.calendarView = new App.CalendarView({
        el: '.calendar',
        collection: schedules
      });

      this.formDialogView = new App.FormDialogView({
        el: '.dialog',
        collection: schedules
      });

      this.calendarControlView = new App.CalendarControlView({
        el: '.calendar-control',
        collection: schedules
      });

      this.listenTo(App.mediator, 'route:change', this.changeRoute);
    },
    changeRoute: function(route){
      this.navigate(route);
    },
    routes: {
      ':year/:month': 'calendars',
      '*default': 'today' // *all とかでもなんでもいい
    },
    calendars: function(year, month){
      this.calendarView.moveTo(year, month);
    },
    today: function(){
      this.calendarView.toToday();
    }
  });

  new Router();
  Backbone.history.start();
});
