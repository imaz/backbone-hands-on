App.Schedule = Backbone.Model.extend({
  validate: function(attrs){
              console.log(attrs);
              if(!attrs.title){
                return 'タイトルは必須です!!'
              }
            }
});
