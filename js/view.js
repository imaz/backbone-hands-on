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
    // this.el, this.$el などが使える
    // this.$('xxx') : this.$el.find('xxx') と同じ

    var $caption= this.$('caption');
    var current = moment();

    $caption.text(current.format('YYYY年MM月'));

    var $tbody = this.$('tbody');
    currentDay = moment().startOf('month').startOf('week')
    endDay = moment().endOf('month');

    while(currentDay <= endDay){
      var $tr = $('<tr>');
      for (var i = 0; i < 7; i++){
        var $td = $('<td>');
        $td.text(currentDay.format('DD'));
        $tr.append($td);
        currentDay.add(1, 'day');
      }
      $tr.appendTo($tbody);
    }
  }
});
