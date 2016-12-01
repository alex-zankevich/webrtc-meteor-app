import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/app.js';

import { Lectures } from '../imports/collections/lectures.js';

Meteor.startup(() => {
	ReactDOM.render(<App />, document.querySelector('.render-target'));
});
