window.App = {};

$(function(){
  var schedules = new App.Schedules();
  var appendSchedule = function(model){
    var $li = $('<li>');
    $li.html(model.show());
    $('.list').append($li)
  };

  $('.createForm').on('submit', function(e){
    e.preventDefault();

    var title = $('input[name="title"]').val() || undefined; // デフォルト値が入るようにする(良くないコードらしい)
    var datetime = moment($('input[name="datetime"]').val());

    schedules.add({title: title, datetime: datetime}, {validate: true});
  });

  $('.filterForm').on('submit', function(e){
    e.preventDefault();

    var filterDate = $('input[name="filterDate"]').val();
    var results = schedules.findByDate(filterDate);

    $('.count').html(results.length + '件の予定があります');
    $('.list').empty();

    _.each(results, function(model){
      appendSchedule(model);
    });
  });

  schedules.on('invalid', function(model, message){
    alert(message);
  });

  schedules.on('add', function(model){
    appendSchedule(model);
  });
});
