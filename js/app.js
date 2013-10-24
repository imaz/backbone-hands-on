window.App = {};

$(function(){
  var schedules = new App.Schedules();

  schedules.add({title: 'Backbone.js ハンズオン', datetime: moment('2013-10-24 9:30')}, {validate: true});
  schedules.add({title: 'Backbone.js ハンズオン', datetime: moment('2013-10-25 9:30')}, {validate: true});
  schedules.add({title: 'hokaccha さんを囲む会', datetime: moment('2013-10-34 18:30')}, {validate: true});

  console.log(schedules.models);
  console.log(schedules.pop());
  console.log(schedules.models);
});
