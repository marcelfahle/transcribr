import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Recordings } from './recordings.js';

export const insert = new ValidatedMethod({
  name: 'recordings.insert',
  validate: Recordings.simpleSchema().validator({clean: true}),
  run(args) {

    // add more security here, for example only special group can add
    //const list = Lists.findOne(listId);
    //if (list.isPrivate() && list.userId !== this.userId) {
    //  throw new Meteor.Error('todos.insert.accessDenied',
    //    'Cannot add todos to a private list that is not yours');
    //}

    const recording = args;

    Recordings.insert( recording );
  },
});

export const remove = new ValidatedMethod({
  name: 'galleries.remove',
  validate: new SimpleSchema({
    recordingId: { type: String },
  }).validator(),
  run({ recordingId }) {
    const recording = Recordings.findOne(recordingId);

    Recordings.remove(recordingId);
  },
});

