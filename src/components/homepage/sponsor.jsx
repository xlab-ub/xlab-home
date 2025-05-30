import React from "react";

import "./styles/sponsor.css";

const Sponsor = (props) => {
	const { logo } = props;

	return (
		<React.Fragment>
			<div className="sponsor-cell">
                <img src={`${process.env.PUBLIC_URL}/${logo}`} alt="logo" />
                {/* <div className="homepage-new-description">
                    {title} */}
            </div>
		</React.Fragment>
	);
};

export default Sponsor;
