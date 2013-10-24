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
    this.current = moment();
    this.render();
  },
  render: function(){
    // this.el, this.$el などが使える
    // this.$('xxx') : this.$el.find('xxx') と同じ

    var $caption= this.$('caption');
    $caption.text(this.current.format('YYYY年MM月'));

    var $tbody = this.$('tbody');
    currentDay = this.current.clone().startOf('month').startOf('week')
    endDay = this.current.clone().endOf('month');

    $tbody.empty();

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
  },
  toPrev: function(){
    this.current.subtract(1, 'month');
    this.render();
  },
  toNext: function(){
    this.current.add(1, 'month');
    this.render();
  },
  toToday: function(){
    this.current = moment();
    this.render();
  }
});
