import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Categories } from './categories.js';

Meteor.methods({
  insertCategory({ name, type, helpText = '', subCategories = {}, icon = '', iconApp = '', background = '' }) {
    check(name, String);
    check(type, String);
    check(helpText, String);
    check(subCategories, String);
    return Categories.insert({ name, type, helpText, subCategories, icon, iconApp, background });
  },
  updateCategory(categoryId, { name, type, helpText = '', subCategories = {}, icon = '', iconApp = '', background = '' }) {
    check(categoryId, String);
    check(name, String);
    check(type, String);
    check(helpText, String);
    check(subCategories, String);
    return Categories.update({_id: categoryId}, { $set: {
      name, type, helpText, subCategories, icon, iconApp, background
    } });
  },
  deleteCategory(categoryId) {
    check(categoryId, String);
    return Categories.remove({_id: categoryId });
  }
});
