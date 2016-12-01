import React, { Component } from 'react';
import Accounts from '../accounts';
import { Link, browserHistory } from 'react-router';

export default class Header extends Component {
	onCreateClick(event) {
		event.preventDefault();

		Meteor.call('lectures.insert', (error, lectureId) => {
			browserHistory.push(`/lectures/${lectureId}`);
		});
	}

	render() {
		return (
			<nav className="nav navbar-default">
				<div className="navbar-header">
					<Link to="/" className="navbar-brand">Instalecture</Link>
				</div>
				<ul className="nav navbar-nav navbar-left nav-items-custom">
					<li>
						<Accounts />
					</li>
					<li>
						<a href="#" onClick={this.onCreateClick}>Create room</a>
					</li>
				</ul>
			</nav>
		);
	}
}
