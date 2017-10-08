import { FlowRouter } from 'meteor/kadira:flow-router';

import './tablet_ticket.html';

Template.tablet_ticket.helpers({
  userPath() {
    return Session.get('userPath');
  },
});

Template.tablet_ticket.events({
  'click #send-ticket'(event) {
    event.preventDefault();
    FlowRouter.go('/tablet/suivi');
  }
});
