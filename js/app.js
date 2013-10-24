window.App = {};

$(function(){
  var schedules = new App.Schedules();

  $('.createForm').on('submit', function(e){
    e.preventDefault();

    var title = $('input[name="title"]').val() || undefined; // デフォルト値が入るようにする(良くないコードらしい)
    var datetime = $('input[name="datetime"]').val();

    schedules.add({title: title, datetime: moment(datetime)}, {validate: true});
  });

  schedules.on('invalid', function(model, message){
    alert(message);
  });

  schedules.on('add', function(model){
    $li = $('<li>');
    $li.html(model.show());
    $('.list').append($li)
  });
});
