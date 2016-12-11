import React, { Component } from 'react';
import CodeMirror from 'react-codemirror';
import 'codemirror/mode/markdown/markdown';
import 'codemirror/mode/javascript/javascript';

class LectruesEditor extends Component {
	onEditorChange(content) {
		Meteor.call('lectures.updateContent', this.props.lecture, content);
	}

	render() {
		return (
			<div className="col-sm-12 col-md-8 lecture-editor">
				<h5>Input</h5>
				<CodeMirror
					value={this.props.lecture.content}
					onChange={ this.onEditorChange.bind(this) }
					options={{ mode: 'javascript', lineNumbers: true }}/>
			</div>
		);
	}
}

export default LectruesEditor;
