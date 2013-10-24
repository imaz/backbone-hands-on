window.App = {};

$(function(){
  var schedules = new App.Schedules();

  $('.createForm').on('submit', function(e){
    e.preventDefault();

    var title = $('input[name="title"]').val()
    , datetime = $('input[name="datetime"]').val()
    ;

    schedules.add({title: title, datetime: datetime});

    console.log(schedules.pop());
  });
});
