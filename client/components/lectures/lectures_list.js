import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Lectures } from '../../../imports/collections/lectures';
import { Link } from 'react-router';

class LecturesList extends Component {
	onLectureRemove(lecture) {
		Meteor.call('lectures.remove', lecture);
	}

	renderRemoveButton(lecture) {
		if (Meteor.user()._id === lecture.ownerId) {
			return (
				<button
					className="btn btn-danger"
					onClick={ () => this.onLectureRemove(lecture) }>
					Remove
				</button>
			);
		}
	}

	renderList() {
		return this.props.lectures.map((lecture) => {
			const url = `/lectures/${lecture._id}`;

			return (
				<div className="card" key={lecture._id}>
					<div className="card-content">
						<h3>{lecture.name}</h3>
						<p>{lecture.description}</p>
					</div>
					<div className="card-action">
						<Link to={url} className="btn btn-primary">Go to lesson</Link>
						{ this.renderRemoveButton(lecture) }
					</div>
			  </div>
			);
		});
	}

	render() {
		return (
			<div>
				{ this.renderList() }
			</div>
		);
	}
}

export default createContainer(() => {
	Meteor.subscribe('lectures');
	Meteor.subscribe('sharedLectures');

	return { lectures: Lectures.find({}).fetch() };
}, LecturesList);
