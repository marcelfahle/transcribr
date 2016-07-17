import React from 'react';

import TranscribrRecorder from './TranscribrRecorder';

class Transcribr extends React.Component {
  constructor( props ) {
    super( props );

    this.state = {
      showRecorder: false
    }

    this.openRecorder = this.openRecorder.bind(this);
    this.closeRecorder = this.closeRecorder.bind(this);
  }

  recorderModal() {
    return(
			<div className="reveal" id="recorderModal" data-reveal>
        <TranscribrRecorder id={this.props.id} />
			</div> 
    )
  } 

  openRecorder(e) {
    e.preventDefault();
    this.setState({showRecorder: true}, () => {
      const recorder = new Foundation.Reveal($('#recorderModal'));
      recorder.open();
    }); 
  }

  closeRecorder() {
    console.log('close recorder');
    this.setState({showRecorder: false});
  }

  render() {
    return(
      <div className="transcribr">
        <ul className="menu dropdown" data-dropdown-menu>
          <li><a href="#" onClick={this.openRecorder}><i className="fi-record"></i> <span>Record now</span></a></li>
          <li>
            <a href="#"><i className="fi-play"></i> <span>Transcriptions: 0</span></a>
            <ul className="menu">
              <li><a href="#">by marcelfahle - 00:12 </a></li>
              <li><a href="#">by monikapociute - 00:12 </a></li>
            </ul>
          </li>
        </ul>
        { (this.state.showRecorder)? this.recorderModal() : null }
      </div>
    )
  }
}

export default Transcribr;
