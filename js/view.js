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
      $tr.appendTo($tbody);

      for (var i = 0; i < 7; i++){
        var cell = new App.CalendarCellView({
          collection: this.collection,
          date: currentDay.clone()
        });

        $tr.append(cell.el);
        currentDay.add(1, 'day');
      }
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

App.CalendarCellView = Backbone.View.extend({
  tagName: 'td', // new したときに要素ができる elと同じ
  initialize: function(options){
    this.date = options.date;
    this.render();
  },
  template:
    '<div class="calendar-date"><%= date.format("MM/DD") %></div>' +
    '<ul class="calendar-list"></ul>',
  render: function(){
    var html = _.template(this.template, {date: this.date});
    this.$el.html(html);

    var $ul = this.$('ul');
    _.each(this.collection.findByDate(this.date), function(model){
      var item = new App.CalendarItemView({model: model});
      $ul.append(item.el);
    });

    this.$el.append($ul);
  }
})

App.CalendarItemView = Backbone.View.extend({
  events: {
    'click': 'onClick'
  },

  tagName: 'li',
  template:
    '<time><%= date %></time>' +
    '<span><%= title %></span>',
  initialize: function(){
    this.render();
  },
  render: function(){
    var html = _.template(this.template, {
      date: this.model.formatDateTime('HH:mm'),
      title: this.model.get('title')
    });

    this.$el.html(html);
  },

  onClick: function(){
    App.formDialogView.open();
  }
});

App.FormDialogView = Backbone.View.extend({
  open: function(){
    this.$el.show();
  }
});
