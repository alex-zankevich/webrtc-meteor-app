import React, { Component } from 'react';
import Peer from 'peerjs';

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

	onPeerOpen() {
		return this.peer.on('open', () =>
			Meteor.users.update(
				{ _id: Meteor.userId() },
				{ $set: { profile: { peerId: this.refs.ownPeerId.textContent = this.peer.id } } }
			)
		);
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
			this.callPeer(this.refs.remotePeerId.value, this.localStream)
				.on('stream', (remoteStream) =>
					this.refs.theirVideoStream.src = URL.createObjectURL(this.remoteStream = remoteStream));
		}
	}

	endCall() {
		if (this.currentCall) {
			this.currentCall.close();
		}
	}

	componentDidMount() {
		this.startStream();
	}

	render() {
		return (
			<div className="col-sm-12 col-md-4">
				<h5>My Stream</h5>
				<video ref="ownVideoStream"
							 id="own-video"
							 muted="true"
							 className="video-stream"
							 autoPlay>
				</video>
				<h5>Thier Stream</h5>
				<video ref="theirVideoStream"
							 id="their-video"
							 muted="true"
							 className="video-stream"
							 autoPlay>
				</video>
				<div className="call-controls col-xs-4">
					<p>Your id: <span ref="ownPeerId" id="own-peer-id"></span></p>
					<p>Make a call</p>
					<input type="text" placeholder="Call user id..." ref="remotePeerId" id="remote-peer-id" />
					<p><a href="#" id="make-call" onClick={ this.makeCall() }>Call</a></p>
					<p><a href="#" id="end-call" onClick={ this.endCall() }>End call</a></p>
				</div>
			</div>
		);
	}
}
