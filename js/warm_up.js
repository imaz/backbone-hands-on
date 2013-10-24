jQuery(function($){
  console.log('Hello Backbone.js ' + Backbone.VERSION);

  var time_now = function(){
    var m = moment();
    return time_format(m);
  };

  var birthday = function(){
    var m = moment({year: 1985, month: 2, day: 25});
    m.add(-1, 'month');
    return time_format(m);
  }

  var time_format = function(object){
    return object.format('YYYY年MM月DD日 HH時mm分ss秒')
  };

  $('#timenow-box').on('click', function(){console.log(time_now())});
  $('#birthday-box').on('click', function(){console.log(birthday())});
});
