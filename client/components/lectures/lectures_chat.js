import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Messages } from '../../../imports/collections/messages';

class LecturesChat extends Component {
	isUserMessage(message) {
		return Meteor.user()._id === message.user._id;
	}

	renderIcon(message) {
		return (
      <span className={`chat-img ${this.isUserMessage(message) ? 'pull-right' : 'pull-left'}`}>
				<img src={`/avatar_default/${this.isUserMessage(message) ? 'red' : 'blue'}/avatar-extrasmall.png`}
						 alt="User Avatar"
						 className="img-circle" />
			</span>
    );
	}

	renderHeader(message) {
		return (
      <div className="header">
      	<small className={`${this.isUserMessage(message) ? '' : 'pull-right'} text-muted`}>
					<span className="glyphicon glyphicon-time"></span>{message.createdAt.toUTCString()}
				</small>
				<strong className={`${this.isUserMessage(message) ? 'pull-right' : ''} primary-font`}>
					{this.getEmail(message.user ? message.user.emails[0] : '')}
				</strong>
			</div>
    );
	}

	renderMessages() {
		return this.props.messages.map(message => (
			<li className={`${this.isUserMessage(message) ? 'right' : 'left'} clearfix`} key={ message._id }>
				{ this.renderIcon(message) }
				<div className="chat-body clearfix">
					{ this.renderHeader(message) }
					<p>{ message.message }</p>
				</div>
			</li>
		));
	}

	getEmail({ address }) {
		return address ? address.replace(/@.*/gim, '') : '';
	}

	sendMessage() {
		let message;

		if (this.refs.messageInput && (message = this.refs.messageInput.value) && message) {
			Meteor.call('messages.insert', this.props.lecture, message, Meteor.user());
			this.refs.messageInput.value = '';
		}
	}

	render() {
		return (
			<div className="container chat-wrapper">
				<div className="panel panel-primary col-md-6 col-lg-6 col-xs-12">
						<div className="panel-body">
								<ul className="chat">
										{ this.renderMessages() }
								</ul>
						</div>
						<div className="panel-footer input-group">
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
		);
	}
};

export default createContainer(({lecture}) => {
	Meteor.subscribe('messages');

	return { messages: Messages.find({ lectureId: lecture._id }).fetch() };
}, LecturesChat);
