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
