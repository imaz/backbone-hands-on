App.CreateFormView = Backbone.View.extend({
  events: {
    'submit': 'onSubmit',
  },

  onSubmit: function(e){
    e.preventDefault();

    var title = this.$('input[name="title"]').val();
    var datetime = this.$('input[name="datetime"]').val();

    this.collection.add({
      title: title || undefined,
      datetime: moment(datetime)
    }, {validate: true});
  }
});

App.CalendarView = Backbone.View.extend({
  initialize: function(){
    // これ便利だー onload で定義後1回呼ぶみたいなの書かなくて良いのか
    this.render();
  },
  render: function(){
    // this.el
    // this.$el
    // this.$('xxx') : this.$el.find('xxx') と同じ
  }
});
