import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Lectures } from '../../../imports/collections/lectures';

class LecturesList extends Component {
	onLectureRemove(lecture) {
		Meteor.call('lectures.remove', lecture);
	}

	renderList() {
		return this.props.lectures.map((lecture) => {
			return (
				<li className="list-group-item" key={lecture._id}>
					Lecture: {lecture._id}
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
