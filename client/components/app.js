import React from 'react';

import Header from './header/header.js';

export default (props) => {
	return (
		<div>
			<Header />
			<main>
				{ props.children }
			</main>
		</div>
	);
};
