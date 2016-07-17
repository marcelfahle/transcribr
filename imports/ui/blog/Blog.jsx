import React from 'react';

import posts from '../../api/blog/data';

import Blogpost from './Blogpost';

class Blog extends React.Component {
  render() {
    return(
			<div>
			  <div className="top-bar">
			  	<div className="top-bar-left">
			  		<ul className="menu">
			           <li className="menu-text"><a href="/">Blog</a></li>
			  			<li><a href="#">Portfolio</a></li>
			  			<li><a href="#">About Me</a></li>
			  			<li><a href="#">Contact</a></li>
			  		</ul>
			  	</div>
			  </div>

       <div className="callout large primary">
				<div className="row column text-center">
					<h1>Vaasa Blog</h1>
					<h2 className="subheader">This is a blog about the cool shit that is happening in Vaasa. It has nothing to do with the swedish näkkileipä Wasabröd.</h2>
				</div>
			</div> 


			<div className="row medium-8 large-7 columns">
        { 
          posts.map( (p, i) => {
            return (
              <Blogpost key={i} i={i} post={p} />
            )
          })
        }

				

			</div>








			</div>
    )
  }
}

export default Blog;
