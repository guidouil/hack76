import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Categories } from '../categories.js';


Meteor.publish('categories', () => {
  return Categories.find();
});
