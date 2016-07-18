import { Recordings } from './../recordings.js';

Meteor.publish( 'recordings.all', () => {
  return Recordings.find({});
});
Meteor.publish( 'recordings.post', (refId) => {
  return Recordings.find({refId: refId});
});
