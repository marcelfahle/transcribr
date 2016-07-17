import React from 'react';

export default class Blogpost extends React.Component {
  constructor( props ) {
    super( props );
  }

  render() {
	  const post = this.props.post;	
    return (
			<div className="blog-post">
        <h3>{ post.title } <small>{ post.date }</small></h3>
        <p>{ post.body }</p>
        <div className="callout">
          <ul className="menu simple">
            <li><a href="#">Author: Tommy Westlin</a></li>
            <li><a href="#">Comments: 0</a></li>
            <li> /// </li>
            <li><a href="#">Transcriptions: 0</a></li>
            <li><a href="#">Record now</a></li>
          </ul>
        </div>
      </div>
    )
  }
}
