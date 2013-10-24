window.App = {};

$(function(){
  $('.createForm').on('submit', function(e){
    e.preventDefault();

    var title = $('input[name="title"]').val()
    , datetime = $('input[name="datetime"]').val()
    ;

    console.log(title, datetime);
  });
});
