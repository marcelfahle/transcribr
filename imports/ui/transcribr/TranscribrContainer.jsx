import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import Transcribr from './Transcribr';

import { Recordings } from './../../api/recordings/recordings.js';

export default TranscribrContainer = createContainer( ({params}) => {
  const { id } = params; 
  const recHandler = Meteor.subscribe('recordings.post', id);
  const recordings = Recordings.find({refId: id}, {sort: {createdAt: -1}}).fetch();
  const loading = !recHandler.ready()
  return {
    id,
    loading,
    recordings
  };
}, Transcribr);
