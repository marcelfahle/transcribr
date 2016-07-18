import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

import RecordRTC from 'recordrtc';


import AccountsUIWrapper from './../AccountsUIWrapper';

import { uploadToS3 } from './../../modules/upload.js';

var recordRTC; 
var audio;
var recordingTimeInterval;

class TranscribrRecorder extends TrackerReact( React.Component ) {
  constructor( props ) {
    super ( props );

    this.startRecording = this.startRecording.bind(this);
    this.stopRecording = this.stopRecording.bind(this);
    this.setRecordingTime = this.setRecordingTime.bind(this);
    this.uploadRecording = this.uploadRecording.bind(this);
    this.setUploader = this.setUploader.bind( this );
    this.uploadHandler = this.uploadHandler.bind( this );

    this.onSuccess = this.onSuccess.bind(this);
    this.onFail = this.onFail.bind(this);

    this.state = {
      isRecording: false,
      isRecorded: false,
      isUploading: false,
      isPaused: false,
      isPublished: false,
      recordingTime: 0,
      recordedBlob: null,
      uploader: null
    }

  }

  componentDidMount() {
  }

  setRecordingTime() {
    this.setState({recordingTime: this.state.recordingTime + 1});
  }

  onFail( e ) {
    console.log('Fail ', e);
  }

  onSuccess( s ) {
    var options = {
      mimeType: 'audio/ogg', // audio/ogg or video/webm
      audioBitsPerSecond : 128000,
      onaddtrack: (e) => {
        console.log('on add track', e );
      },
      onactive: (e) => {
        console.log('on active', e );
      }
    }
    console.log('s', s);
    recordRTC = RecordRTC( s, options );
    recordRTC.startRecording();
    recordingTimeInterval = setInterval(this.setRecordingTime, 1000);
    this.setState({isRecording: true});
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
      
      //recordRTC.save('file-name.WAV');
      //recordRTC.getDataURL( (dataURL) => { });
      clearInterval( recordingTimeInterval );
      this.setState({
        isRecording: false, 
        isRecorded: true, 
        recordedBlob: recordRTC.getBlob()
      }, () => {
        audio = document.getElementsByTagName("audio")[0];
        audio.src = audioURL;
      });
    });
  }

  setUploader( uploader ) {
    this.setState({uploader: uploader});
  }

  uploadHandler() {
    this.props.onRecordingPublished();
  }

  uploadRecording() {
    uploadToS3({
      component: this,
      id: this.props.id,
      blob: this.state.recordedBlob
    });
    this.setState({ isUploading: true });
  }

  recordingStatus() {
    if (this.state.isRecording) {
      return(
        <p>Time recorderd: {this.state.recordingTime} seconds</p>
      )
    }
    if (this.state.isRecording && this.state.isPaused) {
      return(
        <p>Paused</p>
      )
    }
    if (this.state.isRecorded && this.state.isUploading && this.state.uploader) {
      let style = {
        width: `${Math.round(this.state.uploader.progress() * 100)}%`
      }
      return(
        <div>
          <p>Publishing, please wait...</p>
          <div className="progress" role="progressbar" tabIndex="0" aria-valuenow="20" aria-valuemin="0" aria-valuetext={`${Math.round(this.state.uploader.progress() * 100)} percent`} aria-valuemax="100">
            <span className="progress-meter" style={style}>
              <p className="progress-meter-text">{Math.round(this.state.uploader.progress() * 100)}%</p>
            </span>
          </div>
        </div>
      )
    }
    if (this.state.isRecorded && !this.state.isUploading) {
      return(
        <div>
          <audio controls></audio>
          <button type="button" className="success button" onClick={this.uploadRecording}>Publish</button>
        </div>
      )
    }
    return (
      <button type="button" className="alert button" onClick={this.startRecording}>Record</button>
    )
  }


  recorder() {

    return (
			<div>
        { this.recordingStatus() }
        { (this.state.isRecording)? <button type="button" className="button" onClick={this.stopRecording}>Stop</button> : null }
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
