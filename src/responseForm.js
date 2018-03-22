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
	editing: PropTypes.bool,
	submissionState: PropTypes.string,
};

const defaultProps = {
	responseText: '',
	minimumWordCount: 1,
	wordCount: 0,
	editing: true,
	submissionState: 'todo',
};

class ResponseForm extends Component {
	constructor() {
		super();

		this.state = {
			isValid: false,
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.toggleEdit = this.toggleEdit.bind(this);
	}

	componentWillMount() {
		this.setState({
			...this.props,
		});
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
			this.toggleEdit();
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
	toggleEdit() {
		this.setState({
			editing: !this.state.editing,
		});
	}

	render() {
		return(
			<div>
				{(!this.state.editing || this.props.submissionState === 'graded') && 
				<div className="response-form">
					<p>{this.state.responseText}</p>
					<p className="word-count">{this.state.wordCount} words</p>
					<div className="submit">
						{
							this.props.submissionState !== 'graded' && 
							<button type="submit" 
								className={this.state.isValid ? 'valid' : 'invalid'} 
								onClick={this.toggleEdit}>
								Edit Response
							</button>
						}
					</div>
				</div>
				}
				{this.state.editing && 
				<form onSubmit={this.handleSubmit} className="response-form">
					<textarea 
						className="response"
						value={this.state.responseText} 
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
				}
			</div>
			
		);
	}
}

ResponseForm.propTypes = propTypes;
ResponseForm.defaultProps = defaultProps;

export default ResponseForm;