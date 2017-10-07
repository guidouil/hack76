Categories = new Mongo.Collection('categories');
CollectionName.allow({
  insert: function() {
    return false;
  },
  update: function() {
    return false;
  },
  remove: function() {
    return false;
  }
});
