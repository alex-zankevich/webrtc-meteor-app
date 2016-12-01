import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Lectures } from '../../../imports/collections/lectures';
import { Link } from 'react-router';

class LecturesList extends Component {
	onLectureRemove(lecture) {
		Meteor.call('lectures.remove', lecture);
	}

	renderList() {
		return this.props.lectures.map((lecture) => {
			const url = `/lectures/${lecture._id}`;
			return (
				<li className="list-group-item" key={lecture._id}>
					<Link to={url}>Lecture: {lecture._id}</Link>
					<span className="pull-right">
						<button
							className="btn btn-danger"
							onClick={ () => this.onLectureRemove(lecture) }>
							Remove
						</button>
					</span>
				</li>
			);
		});
	}

	render() {
		return (
			<ul className="list-group">
				{ this.renderList() }
			</ul>
		);
	}
}

export default createContainer(() => {
	Meteor.subscribe('lectures');

	return { lectures: Lectures.find({}).fetch() };
}, LecturesList);
