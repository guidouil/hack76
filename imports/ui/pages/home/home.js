import { Categories } from '/imports/api/categories/categories.js';
import { FlowRouter } from 'meteor/kadira:flow-router';

import './home.html';

import '../../components/hello/hello.js';
import '../../components/info/info.js';


Template.App_home.onCreated(() => {
  const instance = this;
  Meteor.subscribe('categories');
});

Template.App_home.helpers({
  categories() {
    return Categories.find().fetch();
  },
});

Template.App_home.events({
  'click .categoryIcon'() {
    FlowRouter.go(`/arbo/${this._id}`);
  }
});
