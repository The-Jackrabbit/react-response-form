import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './responseForm.css';

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
	minimumWordCount: 1,
};

class ResponseForm extends Component {
	constructor() {
		super();

		this.state = {
			responseText: '',
			wordCount: 0,
			isValid: false,
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
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
		let words = str.split(' ');
		return words.length - 1*(str[str.length - 1] === ' ');
	}

	handleChange(event) {
		let text = event.target.value;
		let newWordCount = this.state.wordCount;

		newWordCount = this.countWords(text);

		this.setState({
			responseText: text,
			wordCount: newWordCount,
			isValid: newWordCount >= this.props.minimumWordCount,
		});
	}

	render() {
		return(
			
			<form onSubmit={this.handleSubmit} className="response-form">
				<textarea 
					className="response"
					value={this.state.value} 
					onChange={this.handleChange} />
				<p className="word-count">{
					(this.props.minimumWordCount - this.state.wordCount) > 0 
						? this.props.minimumWordCount - this.state.wordCount 
						: 0
				} words left</p>
				<div className="submit">
					<button type="submit" className={this.state.isValid ? 'valid' : 'invalid'}>Submit</button>
				</div>
			</form>
		);
	}
}

ResponseForm.propTypes = propTypes;
ResponseForm.defaultProps = defaultProps;

export default ResponseForm;