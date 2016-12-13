import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Messages } from '../../../imports/collections/messages';

class LecturesChat extends Component {
	isUserMessage(message) {
		return Meteor.user()._id === message.user._id;
	}

	renderIcon(message) {
		if (this.isUserMessage(message)) {
			return (
        <span className="chat-img pull-right">
					<img src="http://placehold.it/50/FA6F57/fff&amp;text=ME" alt="User Avatar" className="img-circle" />
				</span>
      );
		} else {
			return (
				<span className="chat-img pull-left">
					<img src="http://placehold.it/50/55C1E7/fff&amp;text=U" alt="User Avatar" className="img-circle" />
				</span>
			);
		}
	}

	renderHeader(message) {
		if (this.isUserMessage(message)) {
			return (
        <div className="header">
        	<small className="text-muted">
						<span className="glyphicon glyphicon-time"></span>{message.createdAt.toUTCString()}
					</small>
					<strong className="pull-right primary-font">{this.getEmail(message.user ? message.user.emails[0] : '')}</strong>
				</div>
      );
		} else {
			return (
				<div className="header">
					<strong className="primary-font">{this.getEmail(message.user ? message.user.emails[0] : '')}</strong>
					<small className="pull-right text-muted">
						<span className="glyphicon glyphicon-time"></span>{message.createdAt.toUTCString()}
					</small>
				</div>
			);
		}
	}

	renderMessages() {
		return this.props.messages.map(message => (
			<li className={(this.isUserMessage(message) ? "right" : "left") + " clearfix"} key={message._id}>
				{ this.renderIcon(message) }
				<div className="chat-body clearfix">
					{ this.renderHeader(message) }
					<p>{message.message}</p>
				</div>
			</li>
		));
	}

	getEmail({ address }) {
		return address ? address.replace(/@.*/gim, '') : '';
	}

	sendMessage() {
		let message;

		if (this.refs.messageInput && (message = this.refs.messageInput.value)) {
			return Meteor.call('messages.insert', this.props.lecture, message, Meteor.user());
		}
	}

	render() {
		return (
			<div className="container chat-wrapper">
				<div className="row">
						<div className="col-md-6 col-lg-6 col-xs-12">
								<div className="panel panel-primary">
										<div className="panel-body">
												<ul className="chat">
														{ this.renderMessages() }
												</ul>
										</div>
										<div className="panel-footer">
												<div className="input-group">
														<input id="btn-input"
																	 type="text"
																	 className="form-control input-sm"
																	 ref="messageInput"
																	 placeholder="Type your message here..." />
														<span className="input-group-btn">
																<button className="btn btn-primary btn-sm"
																				id="btn-chat"
																				onClick={ this.sendMessage.bind(this) }>
																		Send
																</button>
														</span>
												</div>
										</div>
								</div>
						</div>
				</div>
		</div>
		);
	}
};

export default createContainer(({lecture}) => {
	Meteor.subscribe('messages');

	return { messages: Messages.find({ lectureId: lecture._id }).fetch() };
}, LecturesChat);
