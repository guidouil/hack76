import { ReactiveVar } from 'meteor/reactive-var';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { Categories } from '/imports/api/categories/categories.js';

import './categories.html';

import '../../components/category/category.js';

Template.categories.onCreated(function() {
  const instance = this;
  Meteor.subscribe('categories');
  instance.newCategory = new ReactiveVar(false);
});

Template.categories.helpers({
  newCategory() {
    return Template.instance().newCategory.get();
  },
  categories() {
    return Categories.find().fetch();
  },
  categoryId() {
    return FlowRouter.getParam('categoryId');
  },
});

Template.categories.events({
  'click #newCategory'(event, instance) {
    instance.newCategory.set(true);
  },
  'submit form'(event, instance) {
    instance.newCategory.set(false);
  },
});
