App.Schedule = Backbone.Model.extend({
  defaults: {
              title: '予定あり',
              datetime: null
            },
  validate: function(attrs){
              if(!attrs.title){
                return 'タイトルは必須です!!'
              }
              if(!attrs.datetime){
                return '日時は必須です!!'
              }
              if(!moment.isMoment(attrs.datetime) || !attrs.datetime.isValid()){
                return '日時が不正です!!'
              }
            }
});
