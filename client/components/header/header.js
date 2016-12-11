import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import Accounts from '../accounts';

import { Link, browserHistory } from 'react-router';

class Header extends Component {
	onCreateClick(event) {
		event.preventDefault();

		Meteor.call('lectures.insert', (error, lectureId) => {
			browserHistory.push(`/lectures/${lectureId}`);
		});
	}

	renderCreate() {
		if (this.props.user) {
			return (
				<li>
					<a href="#" onClick={ this.onCreateClick }>Create room</a>
				</li>
			);
		}
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
					{ this.renderCreate() }
				</ul>
			</nav>
		);
	}
}

export default createContainer(() => ({ user: Meteor.user() }), Header);
