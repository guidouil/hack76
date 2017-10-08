import './tablet.html';

Template.App_tablet.onCreated(function () {
  Meteor.subscribe('categories');
});
