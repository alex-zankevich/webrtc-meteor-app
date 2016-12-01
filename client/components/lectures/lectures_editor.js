import React, { Component } from 'react';
import CodeMirror from 'react-codemirror';
import 'codemirror/mode/markdown/markdown';
import 'codemirror/mode/javascript/javascript';

class LectruesEditor extends Component {
	onEditorChange(content) {debugger;
		Meteor.call('lectures.update', this.props.lecture, content);
	}

	render() {
		return (
			<div className="col-xs-8">
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
