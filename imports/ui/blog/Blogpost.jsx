import React from 'react';

import TranscribrContainer from './../transcribr/TranscribrContainer';

export default class Blogpost extends React.Component {
  constructor( props ) {
    super( props );
  }

  componentDidMount() {
    $(document).foundation();
  } 

  render() {
	  const post = this.props.post;	
    return (
			<div className="blog-post">
        <h3>{ post.title } <small>{ post.date }</small></h3>
        <p>{ post.body }</p>
        <div className="callout">
          <ul className="menu simple align-left">
            <li><a href="#">Author: Tommy Westlin</a></li>
          </ul>
          <TranscribrContainer params={{id: post.id}} />

        </div>
      </div>
    )
  }
}
