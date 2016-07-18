import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

import RecordRTC from 'recordrtc';


import AccountsUIWrapper from './../AccountsUIWrapper';

import { uploadToS3 } from './../../modules/upload.js';

var recordRTC; 
var audio;

class TranscribrRecorder extends TrackerReact( React.Component ) {
  constructor( props ) {
    super ( props );

    this.startRecording = this.startRecording.bind(this);
    this.stopRecording = this.stopRecording.bind(this);

    this.onSuccess = this.onSuccess.bind(this);
    this.onFail = this.onFail.bind(this);

  }

  componentDidMount() {
    audio = document.getElementsByTagName("audio")[0];
  }

  onFail( e ) {
    console.log('Fail ', e);
  }

  onSuccess( s ) {
    var options = {
      mimeType: 'audio/ogg', // audio/ogg or video/webm
      audioBitsPerSecond : 128000,
    }
    recordRTC = RecordRTC( s, options );
    recordRTC.startRecording();
  }

  startRecording() {
   	if (navigator.getUserMedia) {
      //navigator.getUserMedia({audio: true}, this.onSuccess, this.onFail);
      navigator.mediaDevices.getUserMedia({video: false,audio: true}).then(this.onSuccess).catch(this.onFail);
		} else {
			console.log('navigator.getUserMedia not present');
		} 
  }

  stopRecording() {
    recordRTC.stopRecording( (audioURL) => {
      audio.src = audioURL;

      var recordedBlob = recordRTC.getBlob();
      uploadToS3({
        component: this,
        blob: recordedBlob
      });
      //recordRTC.save('file-name.WAV');
      //recordRTC.getDataURL( (dataURL) => { });
    });
  }


  recorder() {

    return (
			<div>
        <audio controls autoPlay></audio>
        <button type="button" className="alert button" onClick={this.startRecording}>Record</button>
        <button type="button" className="button" onClick={this.stopRecording}>Record</button>
			</div>
    )
  }

  render() {
    return (
      <div className="recorder">
				<h1>Record {this.props.id}</h1>

        <AccountsUIWrapper />	

        <div className="recorderInterface">
          { (Meteor.user())? this.recorder() : <p>You need to Login first.</p> }
        
        </div>





			</div> 
    )
  }
}
export default TranscribrRecorder;
