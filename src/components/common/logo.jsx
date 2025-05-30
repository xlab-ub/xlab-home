import React from "react";
import { Link } from "react-router-dom";


import "./styles/logo.css";

const Logo = (props) => {
	let { width, link } = props;

	if (link === undefined) {
		link = true;
	}

	const imageElement = (
		<img src={`${process.env.PUBLIC_URL}/xlab.png`} alt="logo" className="logo" width={width} />
	);

	return (
		<React.Fragment>
			{link ? <Link to="/xlab-home/">{imageElement}</Link> : imageElement}
		</React.Fragment>
	);
};

export default Logo;
