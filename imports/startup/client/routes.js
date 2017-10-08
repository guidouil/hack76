import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Import needed templates
import '../../ui/layouts/body/body.js';
import '../../ui/layouts/admin/admin.js';
import '../../ui/layouts/tablet/tablet.js';

import '../../ui/pages/home/home.js';
import '../../ui/pages/admin/admin.js';
import '../../ui/pages/arbo/arbo.js';
import '../../ui/pages/tablet/tablet.js';
import '../../ui/pages/tablet_arbo/tablet_arbo.js';
import '../../ui/pages/tablet_ticket/tablet_ticket.js';
import '../../ui/pages/tablet_suivi/tablet_suivi.js';
import '../../ui/pages/tablet_details/tablet_details.js';
import '../../ui/pages/categories/categories.js';
import '../../ui/pages/not-found/not-found.js';

// Set up all routes in the app
FlowRouter.route('/', {
  name: 'App.home',
  action() {
    BlazeLayout.render('App_body', { main: 'App_home' });
  },
});

FlowRouter.route('/arbo/:categoryId?', {
  name: 'App.home',
  action() {
    BlazeLayout.render('App_body', { main: 'arbo' });
  },
});

FlowRouter.route('/admin', {
  name: 'App.admin',
  action() {
    BlazeLayout.render('App_admin', { main: 'admin' });
  },
});

FlowRouter.route('/categories/:categoryId?', {
  name: 'App.categories',
  action() {
    BlazeLayout.render('App_admin', { main: 'categories' });
  },
});

FlowRouter.route('/tablet', {
  name: 'App.tablet',
  action() {
    BlazeLayout.render('App_tablet', { main: 'tablet' });
  },
});

FlowRouter.route('/tablet/arbo', {
  name: 'App.tablet_arbo',
  action() {
    BlazeLayout.render('App_tablet', { main: 'tablet_arbo' });
  },
});

FlowRouter.route('/tablet/ticket', {
  name: 'App.tablet_ticket',
  action() {
    BlazeLayout.render('App_tablet', { main: 'tablet_ticket' });
  },
});

FlowRouter.route('/tablet/suivi', {
  name: 'App.tablet_suivi',
  action() {
    BlazeLayout.render('App_tablet', { main: 'tablet_suivi' });
  },
});

FlowRouter.route('/tablet/details', {
  name: 'App.tablet_details',
  action() {
    BlazeLayout.render('App_tablet', { main: 'tablet_details' });
  },
});

FlowRouter.notFound = {
  action() {
    BlazeLayout.render('App_body', { main: 'App_notFound' });
  },
};
