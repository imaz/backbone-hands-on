window.App = {};

$(function(){
  var schedule = new App.Schedule;

  schedule.set({
    title: 'Backbone.js ハンズオン',
    datetime: moment('2013-10-24 9:30')
  });

  $('#schedule').html(schedule.get('datetime').format('MM月DD日 HH時mm分') + ' : ' + schedule.get('title'));
});
