import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Categories } from './categories.js';

Meteor.methods({
  insertCategory({ name, type, isFirst, helpText = '', subCategories = '', icon = '', iconApp = '', background = '', order = 0 }) {
    check(name, String);
    check(type, String);
    check(helpText, String);
    check(subCategories, String);
    check(isFirst, Boolean);
    check(icon, String);
    check(iconApp, String);
    check(background, String);
    check(order, Number);

    return Categories.insert({ name, type, isFirst, helpText, subCategories, icon, iconApp, background, order });
  },
  updateCategory(categoryId, { name, type, isFirst, helpText = '', subCategories = '', icon = '', iconApp = '', background = '', order = 0 }) {
    check(categoryId, String);
    check(name, String);
    check(type, String);
    check(helpText, String);
    check(subCategories, String);
    check(isFirst, Boolean);
    check(icon, String);
    check(iconApp, String);
    check(background, String);
    check(order, Number);
    return Categories.update({_id: categoryId}, { $set: {
      name, type, isFirst, helpText, subCategories, icon, iconApp, background, order
    } });
  },
  deleteCategory(categoryId) {
    check(categoryId, String);
    return Categories.remove({_id: categoryId });
  }
});
