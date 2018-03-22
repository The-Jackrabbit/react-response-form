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
	<div
		style={{
			width: '300pt',
		}}>
		<ResponseForm 
			studentId='lsm5fm' 
			studentEmail='lsm5fm@virginia.edu' 
			readingId={1}
			onSubmit={handleSubmit}/>
	</div>,
	document.getElementById('root')
);
registerServiceWorker();
