import React, { Component } from 'react';

export const DescriptionInfo = ({ name, description, owner }) => {
	return (
		<div className="description-info">
			<h3>{ name }</h3>
			<h4>{ description }</h4>
			{Meteor.userId() === owner &&
			<button className="btn btn-default toggle-description"
							data-toggle="collapse"
							data-target=".description-wrapper">Edit descriptioin
			</button>}
		</div>
	);
};

export class DescriptionEdit extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: props.lecture.name,
			description: props.lecture.description
		};
	}

	handleChange() {
		let updatedValue = {
			name: this.refs.lectureName.value,
			description: this.refs.lectureDescription.value
		};

		this.setState(updatedValue);

		Meteor.call('lectures.updateDescription', this.props.lecture, updatedValue);
	}

	render() {
		return (
			<div className="description-wrapper collapse">
				<div className="form-group">
					<label htmlFor="lecture-name">Name:</label>
					<input type="text"
								 className="form-control"
								 id="lecture-name"
								 ref="lectureName" />
				</div>
				<div className="form-group">
					<label htmlFor="lecture-description">Short description:</label>
					<input type="text"
								 className="form-control"
								 id="lecture-description"
								 ref="lectureDescription" />
				</div>
				<button className="btn btn-default toggle-description"
								data-toggle="collapse"
								data-target=".description-wrapper"
								onClick={ this.handleChange.bind(this) }>
					Update
				</button>
			</div>
		);
	}
};

export default class LecturesDescription extends Component {
	render() {
		return (
			<div className="lectures-description-container">
				<DescriptionInfo name={ this.props.lecture.name }
												 description={ this.props.lecture.description }
												 owner={ this.props.lecture.ownerId }/>
				<DescriptionEdit lecture={ this.props.lecture }/>
			</div>
		);
	}
}
