window.App = {};

$(function(){
  var schedules = new App.Schedules()
  , add_counter = 0;

  schedules.on('add', function(model){
    var $box = $('<div>').addClass(add_counter % 2 ? 'blue-neon' : 'yellow-neon');
    $box.html(
      model.show()
    );
    $('body').append($box);
    add_counter += 1; // これaddのコールバックとかに設定できないのかな?
  });

  schedules.add({title: 'Backbone.js ハンズオン', datetime: moment('2013-10-24 9:30')}, {validate: true});
  schedules.add({title: 'hokaccha さんを囲む会', datetime: moment('2013-14-24 18:30')}, {validate: true});
  schedules.add({title: 'Backbone.js ハンズオン', datetime: moment('2013-10-25 9:30')}, {validate: true});
  schedules.add({title: 'Ember.js ハンズオン', datetime: moment('2013-11-9 9:30')}, {validate: true});
});
