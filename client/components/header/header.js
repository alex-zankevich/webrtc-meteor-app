import React, { Component } from 'react';
import Accounts from '../accounts.js';

export default class Header extends Component {
	onCreateClick(event) {
		event.preventDefault();

		Meteor.call('lectures.insert');
	}

	render() {
		return (
			<nav className="nav navbar-default">
				<div className="navbar-header">
					<a className="navbar-brand">Instalecture</a>
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
