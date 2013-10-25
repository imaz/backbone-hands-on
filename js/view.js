App.CalendarView = Backbone.View.extend({
  initialize: function(){
    this.listenTo(this.collection, 'add change remove', this.render);
    this.listenTo(App.mediator, 'calendar:prev', this.toPrev);
    this.listenTo(App.mediator, 'calendar:next', this.toNext);
    this.listenTo(App.mediator, 'calendar:today', this.toToday);
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
    this.routeToCurrent();
  },
  toNext: function(){
    this.current.add(1, 'month');
    this.render();
    this.routeToCurrent();
  },
  toToday: function(){
    this.current = moment();
    this.render();
    App.mediator.trigger('route:change');
  },
  moveTo: function(year, month){
    this.current = moment({year: year, month: month-1});
    this.render();
    this.routeToCurrent();
  },
  routeToCurrent: function(){
    App.mediator.trigger('route:change', this.current.format('YYYY/MM'));
  }
});

App.CalendarCellView = Backbone.View.extend({
  events: {
    'click': 'onClick'
  },
  tagName: 'td', // new したときに要素ができる elと同じ
  template:
    '<div class="calendar-date"><%= date.format("MM/DD") %></div>' +
    '<ul class="calendar-list"></ul>',

  initialize: function(options){
    this.date = options.date;
    this.render();
  },
  render: function(){
    var html = _.template(this.template, {date: this.date});
    this.$el.html(html);

    var $ul = this.$('ul');
    _.each(this.collection.findByDate(this.date), function(model){
      var item = new App.CalendarItemView({model: model});
      $ul.append(item.el);
    });

    this.$el.append($ul);
  },
  onClick: function(){
    var model = new App.Schedule({title: '', datetime: this.date});
    App.mediator.trigger('dialog:open', model);
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
    App.mediator.trigger('dialog:open', this.model);
  }
});

App.FormDialogView = Backbone.View.extend({
  events: {
    'click .dialog-close': 'close',
    'submit form': 'onSubmit',
    'click .dialog-removeBtn': 'onRemove'
  },

  initialize: function(){
    this.$title = this.$('input[name="title"]');
    this.$datetime = this.$('input[name="datetime"]');

    this.listenTo(this.collection, 'add change remove', this.close);
    this.listenTo(this.collection, 'invalid', this.onError);
    this.listenTo(App.mediator, 'dialog:open', this.open);
    this.listenTo(App.mediator, 'dialog:close', this.close);
  },
  render: function(){
    if(this.model){
      this.$title.val(this.model.get('title'));
      this.$datetime.val(this.model.formatDateTime('YYYY-MM-DDTHH:mm'));
      this.$('.dialog-removeBtn').show();
    } else {
      this.$datetime.val(moment().format('YYYY-MM-DDTHH:mm'));
      this.$('.dialog-removeBtn').hide();
    }
    this.$el.show();
  },

  open: function(model){
    this.model = model;
    this.render();
  },
  close: function(){
    this.$el.hide();
    this.$title.val('');
    this.$datetime.val('');
  },
  onSubmit: function(e){
    e.preventDefault();

    var title = this.$title.val();
    var datetime = this.$datetime.val();
    var params = {
      title: title || undefined,
      datetime: moment(datetime)
    };

    if(this.model.isNew()){
      this.collection.create(params, {validate: true});
    } else {
      this.model.save(params, {validate: true});
    }
  },
  onRemove: function(e){
    e.preventDefault();

    if(window. confirm('削除しますか？')){
      this.model.destroy();
    }
  },
  onError: function(model, message){
    alert(message);
  }
});

App.CalendarControlView = Backbone.View.extend({
  events: {
    'click .calendar-newBtn': 'onClickNew',
    'click .calendar-prevBtn': 'onClickPrev',
    'click .calendar-nextBtn': 'onClickNext',
    'click .calendar-todayBtn': 'onClickToday'
  },
  onClickNew: function(e){
    App.mediator.trigger('dialog:open');
  },
  onClickPrev: function(e){
    App.mediator.trigger('calendar:prev');
  },
  onClickNext: function(e){
    App.mediator.trigger('calendar:next');
  },
  onClickToday: function(e){
    App.mediator.trigger('calendar:today');
  }
});
