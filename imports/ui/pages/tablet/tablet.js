import './tablet.html';

Template.tablet.onCreated(function() {
  Session.set('userPath', []);
});

Template.tablet.helpers({
  time() {
    const date = new Date();
    return date.getHours() + ':' + date.getMinutes();
  }
});
