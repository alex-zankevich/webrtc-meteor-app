import React, { Component } from 'react';

const DescriptionInfo = ({ name, description }) => {
	return (
		<div className="description-info">
			<h4>Name: {name}</h4>
			<h4>Description: {description}</h4>
		</div>
	);
};

export default class LecturesDescription extends Component {
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

	renderEditDescription() {
		if (Meteor.user()._id === this.props.lecture.ownerId) {
			return (
				<button className="btn btn-default toggle-description"
								data-toggle="collapse"
								data-target=".description-wrapper">Edit descriptioin</button>
			);
		}
	}

	render() {
		return (
			<div className="lectures-description-container">
				<DescriptionInfo name={ this.state.name } description={ this.state.description } />
				{ this.renderEditDescription() }
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
			</div>
		);
	}
}
