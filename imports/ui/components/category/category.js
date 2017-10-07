import { FlowRouter } from 'meteor/kadira:flow-router';
import { ReactiveVar } from 'meteor/reactive-var';

import { Categories } from '/imports/api/categories/categories.js';

import './category.html';

Template.category.onCreated(function() {
  const instance = this;
  instance.type = new ReactiveVar('parent');
  instance.category = new ReactiveVar();
  instance.autorun(function() {
    const categoryId = FlowRouter.getParam('categoryId');
    if (categoryId) {
      const category = Categories.findOne({
        _id: categoryId
      });
      if (category) {
        instance.category.set(category);
      }
    }
  });
});

Template.category.onRendered(function() {
  $('.dropdown').dropdown({ fullTextSearch: true });
});

Template.category.helpers({
  isType(type) {
    return Template.instance().type.get() === type;
  },
  category() {
    return Template.instance().category.get();
  },
  categories() {
    return Categories.find().fetch();
  },
});

Template.category.events({
  'change [name=type]'(event, instance) {
    console.log(event.currentTarget.value);
    instance.type.set(event.currentTarget.value);
  },
  'submit form'(event, instance) {
    event.preventDefault();
    const category = {};
    category.name = event.currentTarget.name.value;
    category.type = instance.type.get();
    if (category.type === 'help') {
      category.helpText = event.currentTarget.helpText.value;
    }
    const categoryId = FlowRouter.getParam('categoryId');
    if (!categoryId) {
      Meteor.call('insertCategory', category, function(error, success) {
        if (error) console.error(error.reason);
        if (success) {
          FlowRouter.go('/categories');
        }
      });
    } else {
      Meteor.call('updateCategory', categoryId, category, function (error, success) {
        if (error) console.error(error.reason);
        if (success) {
          FlowRouter.go('/categories');
        }
      });
    }
  },
  'click #deleteCategory'() {
    const categoryId = FlowRouter.getParam('categoryId');
    if (categoryId) {
      Meteor.call('deleteCategory', categoryId);
      FlowRouter.go('/categories');
    }
  },
});
