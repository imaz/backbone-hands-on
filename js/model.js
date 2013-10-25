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
    return this.formatDateTime('HH:mm') + ' ' + this.get('title');
  },
});

App.Schedules = Backbone.Collection.extend({
  model: App.Schedule,

  // html5から入ったwebStrageの機能のうちの一つ
  // ドメインとポートの組み合わせでオリジンができる
  // 同一オリジン内で共通のデータを使うことができる
  localStrage: new Backbone.LocalStorage('calendar'),

  findByDate: function(date){
    var format = 'YYYY-MM-DD';
    var targetDate = moment(date).format(format);

    return this.chain()
      .filter(function(model){
        return model.formatDateTime(format) === targetDate;
      })
      .sortBy(function(model){
        return model.get('datetime').valueOf();
      })
      .value();
  }
});
