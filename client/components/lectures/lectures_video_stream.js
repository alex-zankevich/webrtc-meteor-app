import React, { Component } from 'react';

export default class LectureVideoStream extends Component {
	startStream() {
    navigator.getUserMedia({ audio: true, video: true }, (stream) => {
      this.refs.ownVideoStream.src = URL.createObjectURL(stream);

      window.localStream = stream;
    }, () => {});
  }

	componentDidMount() {
    this.startStream();
	}

	render() {
		return (
			<div className="col-xs-4">
				<h5>Stream</h5>
				<video ref="ownVideoStream"
							 id="own-video"
							 muted="true"
							 className="video-stream"
							 autoPlay>
				</video>
			</div>
		);
	}
}
