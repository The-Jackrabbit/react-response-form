import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
	studentId: PropTypes.string.isRequired,
	studentEmail: PropTypes.string.isRequired,
	readingId: PropTypes.number.isRequired,
	onSubmit:  PropTypes.func.isRequired,
	responseText: PropTypes.string,
	minimumWordCount: PropTypes.number,
};

const defaultProps = {
	responseText: '',
	minimumWordCount: 0,
};

class ResponseForm extends Component {
	constructor() {
		super();

		this.state = {
			responseText: '',
			wordCount: 0,
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleBlur = this.handleBlur.bind(this);
	}

	handleSubmit(event) {
		event.preventDefault();
		
		if (this.state.wordCount >= this.props.minimumWordCount) {
			const responseObject = {
				studentId: this.props.studentId,
				studentEmail: this.props.studentEmail,
				responseText: this.state.responseText,
				readingId: this.props.readingId,
				wordCount: this.state.wordCount,
				submissionDate: new Date(),
			};
			this.props.onSubmit(responseObject);
		}

		return false;
	}

	countWords(str) {
		console.log(str[str.length - 1]);
		let words = str.split(' ');
		console.log({
			'words': words,
			'words.length - 1*(str[str.length - 1] === " ")': words.length - 1*(str[str.length - 1] === ' '),
		});
		return words.length - 1*(str[str.length - 1] === ' ');
	}

	handleChange(event) {
		let text = event.target.value;
		let newWordCount = this.state.wordCount;

		if (text[text.length - 1] === ' ') {
			newWordCount = this.countWords(text);
		}

		this.setState({
			responseText: text,
			wordCount: newWordCount,
		});
	}

	handleBlur(event) {
		let text = event.target.value;
		let newWordCount = this.countWords(text);

		this.setState({
			responseText: text,
			wordCount: newWordCount,
		});
	}

	render() {
		return(
			<form onSubmit={this.handleSubmit}>
				<textarea value={this.state.value} onChange={this.handleChange} onBlur={this.handleBlur} />
				<span>{(this.props.minimumWordCount - this.state.wordCount) > 0 ? this.props.minimumWordCount - this.state.wordCount : 0}words left</span>
				<input type="submit" value="Submit"/>
			</form>
		);
	}
}

ResponseForm.propTypes = propTypes;
ResponseForm.defaultProps = defaultProps;

export default ResponseForm;