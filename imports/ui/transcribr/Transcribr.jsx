import React from 'react';

import TranscribrRecorder from './TranscribrRecorder';

import { remove }  from './../../api/recordings/methods.js';

class Transcribr extends React.Component {
  constructor( props ) {
    super( props );

    this.state = {
      isRecorder: false,
      isPlayer: false,
      currentRecording: ''
    }

    this.openRecorder = this.openRecorder.bind( this );
    this.closeRecorder = this.closeRecorder.bind( this );
    this.onRecordingPublished = this.onRecordingPublished.bind( this );
    //this.destroyRecording = this.destroyRecording.bind( this );
    this.cancel = this.cancel.bind( this );
  }

  onRecordingPublished() {
    this.setState({ isRecorder: false });
    $(document).foundation();
  }

  cancel() {
    this.setState({ isRecorder: false, isPlayer: false, currentRecording: '' }, () => {
      $(document).foundation();
    });
  }

  recorder() {
    return(
      <div>
        <TranscribrRecorder 
          id={this.props.id} 
          onRecordingPublished={this.onRecordingPublished}
        />
        <button className="button" onClick={this.cancel}>Cancel</button>
      </div>
    )
  } 

  destroyRecording(id) {
    const rec = { recordingId: id }
    remove.call( rec, (err, res) => {
      if (err) {
        Bert.alert(err.reason, 'danger', 'growl-top-right');
      } else {
        Bert.alert('The recording has been destroyed..', 'success', 'growl-top-right');
      }
    });
  }

  playRecording( url ) {
    this.setState({ isRecorder: false, isPlayer: true, currentRecording: url }); 
  }

  recordings() {
    const recs = this.props.recordings;
    return(
      <li>
        <a href="#"><i className="fi-play"></i> <span>Recordings: {recs.length}</span></a>
        <ul className="menu">
          { recs.map( (rec, i) => {
              return (
                <li key={i}>
                  <a href="#" onClick={() => this.playRecording(rec.file)}>Recording {i+1} - 00:00 </a>
                  { (Meteor.userId() === rec.userId)? (<button className="tiny button" href="#" onClick={() => this.destroyRecording(rec._id)}>destroy</button>) : null }
                </li>
              )
            })}
        </ul>
      </li>
    )
  }

  player() {
    return(
      <div>
        <audio controls src={this.state.currentRecording}></audio>
        <button className="button" onClick={this.cancel}>Close</button>
      </div>
    )
  }

  transcribrInfo() {
    return(
      <ul className="menu dropdown" data-dropdown-menu>
        <li><a href="#" onClick={this.openRecorder}><i className="fi-record"></i> <span>Record now</span></a></li>
        { this.recordings() }
      </ul>
    )
  }

  openRecorder(e) {
    e.preventDefault();
    this.setState({isRecorder: true});
  }

  closeRecorder() {
    console.log('close recorder');
    this.setState({isRecorder: false});
  }

  render() {
    return(
      <div className="transcribr">
        { (this.state.isPlayer)? this.player() : null }
        { (this.state.isRecorder)? this.recorder() : this.transcribrInfo() }
      </div>
    )
  }
}

export default Transcribr;
