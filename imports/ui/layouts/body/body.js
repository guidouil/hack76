import './body.html';

import '../../components/header/header.js';
import '../../components/footer/footer.js';

Template.App_body.onCreated(function() {
  Meteor.subscribe('categories');
});
