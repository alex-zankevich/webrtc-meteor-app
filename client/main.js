import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from './components/app.js';
import LecturesMain from './components/lectures/lectures_main';
import LecturesList from './components/lectures/lectures_list';
import { Lectures } from '../imports/collections/lectures.js';

const routes = (
	<Router history={browserHistory}>
		<Route path="/" component={App}>
			<IndexRoute component={LecturesList}></IndexRoute>
			<Route path="lectures/:lectureId" component={ LecturesMain }>
			</Route>
		</Route>
	</Router>
);

Meteor.startup(() => {
	ReactDOM.render(routes, document.querySelector('.render-target'));
});
