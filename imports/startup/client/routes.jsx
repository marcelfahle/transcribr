import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

import Blog from '../../ui/blog/Blog';

Meteor.startup( () => {
  render (
    <Router history={ browserHistory }>
      <Route path="/" component={ Blog } />
    </Router>,
    document.getElementById( 'react-root' )
  )
});
