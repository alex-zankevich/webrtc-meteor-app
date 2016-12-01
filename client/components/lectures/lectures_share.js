import React, { Component } from 'react';

class LecturesShare extends Component {
	onShareClick() {
		const email = this.refs.email.value;

		Meteor.call('lectures.share', this.props.lecture, email);
	}

	renderShareList() {
		return this.props.lecture.sharedWith.map(email => {
			return (
				<button
					key={email}
					className="btn btn-default">
					{email}
				</button>
			);
		});
	}

	render() {
		return (
			<footer className="lectures-share">
				<div className="input-group">
					<input ref="email" className="form-control" />
					<div className="input-group-btn">
						<button
							onClick={ this.onShareClick.bind(this) }
							className="btn btn-default">
							Share
						</button>
					</div>
				</div>
				<div>Shared With:</div>
				<div className="btn-group">
					{ this.renderShareList() }
				</div>
			</footer>
		);
	}
}

export default LecturesShare;
