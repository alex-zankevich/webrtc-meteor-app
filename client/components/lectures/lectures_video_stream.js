import React, { Component } from 'react';
import Peer from 'peerjs';

import LecturesShare from './lectures_share';

const PEERJS_KEY = 'dvuqo0ibvld0wwmi';

export default class LectureVideoStream extends Component {
	createPeer(key) {
		this.peer = new Peer({
			key: key,
			debug: 3,
			config: {'iceServers': [
				{ url: 'stun:stun.l.google.com:19302' },
				{ url: 'stun:stun1.l.google.com:19302' }
			]}
		});
	}

	isOwner() {
		return Meteor.user() && Meteor.user()._id === this.props.lecture.ownerId;
	}

	onPeerOpen() {
		return this.peer.on('open', () => {
			if (this.isOwner()) {
				Meteor.call('lectures.updatePeerId', this.props.lecture, this.peer.id);
			}

			Meteor.users.update(
				{ _id: Meteor.userId() },
				{ $set: { profile: { peerId: this.peer.id } } }
			);
		});
	}

	onPeerCall() {
		this.peer.on('call', (incomingCall) => {
			incomingCall.answer(this.localStream);

			this.setCurrentCall(incomingCall)
				.on('stream', (remoteStream) =>
					this.refs.theirVideoStream.src = URL.createObjectURL(this.remoteStream = remoteStream));
		});
	}

	checkGetUserMedia() {
		navigator.getUserMedia =
			navigator.getUserMedia ||
			navigator.webkitGetUserMedia ||
			navigator.mozGetUserMedia ||
			navigator.msGetUserMedia;
	}

	showOwnStream() {
		navigator.getUserMedia(
			{ audio: true, video: true },
			(stream) => this.refs.ownVideoStream.src = URL.createObjectURL(this.localStream = stream),
			(error) => console.log(error)
		);
	}

	setCurrentCall(call) {
		return this.currentCall = call;
	}

	callPeer(peerId, stream) {
		return this.setCurrentCall(this.peer.call(peerId, stream));
	}

	startStream() {
		this.checkGetUserMedia();

		this.createPeer(PEERJS_KEY);

		this.onPeerOpen();

		this.onPeerCall();

		this.showOwnStream();
	}

	makeCall() {
		if (this.peer) {
			this.callPeer(this.props.lecture.ownerPeerId, this.localStream)
				.on('stream', (remoteStream) =>
					this.refs.theirVideoStream.src = URL.createObjectURL(this.remoteStream = remoteStream));
		}
	}

	endCall() {
		if (this.currentCall) {
			this.currentCall.close();
		}

		Meteor.call('lectures.updatePeerId', this.props.lecture, null);
	}

	renderStreamConnect() {
		if (!Meteor.user()) {
			return;
		}

		if (this.isOwner()) {
			return (<button className="btn btn-default" onClick={ this.startStream.bind(this) }>Stream</button>);
		} else if (this.props.lecture.ownerPeerId) {
			return (<button className="btn btn-default" onClick={ this.makeCall.bind(this) }>Connect</button>);
		}
	}

	componentDidMount() {
		if (!this.isOwner()) {
			this.startStream();
		}
	}

	render() {
		return (
			<div className="video-stream-main">
				<div className="video-stream-container col-sm-12 col-md-4">
					<video ref="ownVideoStream"
								 id="own-video"
								 muted="true"
								 className="video-stream"
								 autoPlay>
					</video>
					<video ref="theirVideoStream"
								 id="their-video"
								 muted="true"
								 className="video-stream"
								 autoPlay>
					</video>
					<div className="call-controls">
						{ this.renderStreamConnect() }
						<button className="btn btn-default" onClick={ this.endCall.bind(this) }>Disconnect</button>
						<LecturesShare lecture={ this.props.lecture } />
					</div>
				</div>
			</div>
		);
	}
}
