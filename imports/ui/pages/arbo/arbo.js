import { FlowRouter } from 'meteor/kadira:flow-router';
import './arbo.html';

import { Categories } from '/imports/api/categories/categories.js';

Template.arbo.onCreated(() => {
});

Template.arbo.onRendered(() => {
  Meteor.subscribe('category', FlowRouter.getParam('categoryId'));
  let userPath = Session.get('userPath');
  userPath.reverse();
  let found = false;
  const newUserPath = [];
  _.each(userPath, (path) => {
    if (path._id === FlowRouter.getParam('categoryId')) {
      newUserPath.push(path);
      found = true;
    } else if (found) {
      newUserPath.push(path);
    }
  });
  newUserPath.reverse();
  Session.set('userPath', newUserPath);
});

Template.arbo.helpers({
  category() {
    return Categories.findOne({
      _id: FlowRouter.getParam('categoryId')
    });
  },
  toSubcategories(subCategs) {
    if (subCategs) {
      const subIds = subCategs.split(',');
      return Categories.find({ _id: { $in: subIds }}, {sort: {order: 1}}).fetch();
    }
  },
  userPath() {
    return Session.get('userPath');
  },
  currentCateg() {
    return this._id === FlowRouter.getParam('categoryId');
  }
});

Template.arbo.events({
  'click .categoryIcon'(event, template) {
    let userPath = Session.get('userPath');
    userPath.push({ _id: this._id, name: this.name });
    Session.set('userPath', userPath);
    FlowRouter.go(`/arbo/${this._id}`);
  },
});
