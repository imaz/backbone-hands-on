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
  },
  formatDateTime: function(f){
    return this.get('datetime').format(f);
  },
  show: function(){
    return this.formatDateTime('MM月DD日 HH時MM分') + ' : ' + this.get('title');
  },
});

App.Schedules = Backbone.Collection.extend({
  model: App.Schedule,

  findByDate: function(date){
    var format = 'YYYY-MM-DD';
    var targetDate = moment(date).format(format);

    return this.select(function(model) {
      return model.formatDateTime(format) === targetDate;
    });
  }
});
