import { FlowRouter } from 'meteor/kadira:flow-router';
import { ReactiveVar } from 'meteor/reactive-var';

import { Categories } from '/imports/api/categories/categories.js';

import Images from '/imports/api/images/images.js';

import './category.html';

Template.category.onCreated(function() {
  const instance = this;
  instance.type = new ReactiveVar('parent');
  instance.category = new ReactiveVar();
  instance.icon = new ReactiveVar();
  instance.iconApp = new ReactiveVar();
  instance.background = new ReactiveVar();
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
  setTimeout(function () {
    $('.dropdown').dropdown({ fullTextSearch: true });
  }, 400);
});

Template.category.helpers({
  isType(type) {
    return Template.instance().type.get() === type;
  },
  category() {
    return Template.instance().category.get();
  },
  icon() {
    return Template.instance().icon.get();
  },
  iconApp() {
    return Template.instance().icon.get();
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
    category.isFirst = event.currentTarget.isFirst.checked;
    category.subCategories = event.currentTarget.subCategories.value;
    category.icon = event.currentTarget.icon.value;
    category.iconApp = event.currentTarget.iconApp.value;
    category.background = event.currentTarget.background.value;
    category.order = Number(event.currentTarget.order.value);

    console.log(category);
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
