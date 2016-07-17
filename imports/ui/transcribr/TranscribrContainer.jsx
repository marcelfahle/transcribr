import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import Transcribr from './Transcribr';

export default TranscribrContainer = createContainer( ({params}) => {
  const { id } = params; 
  return {
    id
  };
}, Transcribr);
