import { Categories } from '/imports/api/categories/categories.js';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Session } from 'meteor/session';

import './home.html';

import '../../components/hello/hello.js';
import '../../components/info/info.js';


Template.App_home.onCreated(() => {
  Meteor.subscribe('categories.firstPage');
});

Template.App_home.helpers({
  categories() {
    return Categories.find({ isFirst: true }).fetch();
  },
});

Template.App_home.events({
  'click .categoryIcon'() {
    Session.set('userPath', [{ _id: this._id, name: this.name }]);
    FlowRouter.go(`/arbo/${this._id}`);
  }
});
