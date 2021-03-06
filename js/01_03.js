window.App = {};

$(function(){
  var schedule = new App.Schedule;

  schedule.on('change', function(){ // change:title というような指定もできる！
    $('#schedule').html(
      schedule.formatDateTime('MM月DD日 HH時mm分') + ' : ' + schedule.get('title')
    );
  });

  schedule.on('invalid', function(model, message){
    alert(message);
  });

  schedule.set({
    title: 'Backbone.js ハンズオン',
    datetime: moment('2013-10-24 9:30')
  }, {validate: true});
});
