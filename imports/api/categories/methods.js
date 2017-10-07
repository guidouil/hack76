import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Categories } from './categories.js';

Meteor.methods({
  insertCategory({ name, type, helpText = '', subCategories = {} }) {
    check(name, String);
    check(type, String);
    check(helpText, String);
    check(subCategories, Object);
    return Categories.insert({ name, type, helpText, subCategories });
  },
  updateCategory(categoryId, { name, type, helpText = '', subCategories = {} }) {
    check(categoryId, String);
    check(name, String);
    check(type, String);
    check(helpText, String);
    check(subCategories, Object);
    return Categories.update({_id: categoryId}, { $set: {
      name, type, helpText, subCategories
    } });
  },
  deleteCategory(categoryId) {
    check(categoryId, String);
    return Categories.remove({_id: categoryId });
  }
});
