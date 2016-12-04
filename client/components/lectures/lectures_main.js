import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Lectures } from '../../../imports/collections/lectures';
import LectruesEditor from './lectures_editor';
import LecturesShare from './lectures_share';
import LectureVideoStream from './lectures_video_stream';

class LecturesMain extends Component {
	render() {
		if (!this.props.lecture) {
			return (<div>Loading...</div>);
		}

		return (
			<div>
				<LectureVideoStream />
				<LectruesEditor lecture={ this.props.lecture } />
				<LecturesShare lecture={ this.props.lecture } />
			</div>
		);
	}
}

export default createContainer((props) => {
	const { lectureId } = props.params;

	Meteor.subscribe('lectures');
	Meteor.subscribe('sharedLectures');

	return { lecture: Lectures.findOne(lectureId) };
}, LecturesMain);
