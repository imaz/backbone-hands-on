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

    // 以下のふたつの書き方は同じ動作をする
    // View で Model を監視する場合は listenTo を使うのが好ましい
    // on すると collection remove した時に off しなければならない
    // listenTo は stopListening する必要があるがデフォルトの remove メソッドで呼んでいるので安心ある！

    // this.collection.on('add', this.render, this);
    this.listenTo(this.collection, 'add', this.render);
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

        var $date = $('<div class="calendar-date">');
        $date.text(currentDay.format('DD'));

        var $ul = $('<ul class="calendar-list">');
        _.each(this.collection.findByDate(currentDay), function(schedule){
          var $li = $('<li>');
          $li.text(schedule.show());
          $ul.append($li);
        });

        $td.append($date, $ul)
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
