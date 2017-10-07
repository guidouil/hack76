import { Meteor } from 'meteor/meteor';

import './header_admin.html';

Template.header_admin.events({
  'click #signOut'() {
    Meteor.logout();
  }
});
