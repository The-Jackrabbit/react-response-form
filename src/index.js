import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ResponseForm from './responseForm.js';
import registerServiceWorker from './registerServiceWorker';
let handleSubmit = (pkg) => {
	console.log('hi');
	console.log(pkg);
};
ReactDOM.render(
	<ResponseForm 
		studentId='lsm5fm' 
		studentEmail='lsm5fm@virginia.edu' 
		readingId={1}
		onSubmit={handleSubmit}/>,
	document.getElementById('root')
);
registerServiceWorker();
