import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Lectures } from '../../../imports/collections/lectures';
import LectruesEditor from './lectures_editor';
import LectureVideoStream from './lectures_video_stream';
import LecturesDescription from './lectures_description';

class LecturesMain extends Component {
	render() {
		if (!this.props.lecture) {
			return (<div>Loading...</div>);
		}

		return (
			<div className="lecture-main">
				<section>
					<LecturesDescription lecture={ this.props.lecture }/>
					<LectureVideoStream lecture={ this.props.lecture } />
					<LectruesEditor lecture={ this.props.lecture } />
				</section>
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
