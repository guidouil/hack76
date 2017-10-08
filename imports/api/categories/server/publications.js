import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Categories } from '../categories.js';


Meteor.publish('categories', () => {
  return Categories.find({}, { sort: {order: 1 }});
});

Meteor.publish('category', (categoryId) => {
  const category = Categories.findOne({ _id: categoryId });
  if (!category.subCategories) {
    category.subCategories = [];
  } else {
    category.subCategories = category.subCategories.split(',');
  }
  category.subCategories.push(categoryId);
  return Categories.find({
    _id: { $in: category.subCategories }
  });

});

Meteor.publish('categories.firstPage', () => {
  return Categories.find({ isFirst: true });
});

