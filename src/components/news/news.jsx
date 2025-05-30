import React from "react";
import { Link } from "react-router-dom";

import "./styles/news.css";

const New = (props) => {
	const { date, description, link } = props;

	return (
		<React.Fragment>
			<div className="homepage-new">
                <Link to={link}>
                    <div className="homepage-new-content">
                        <div className="homepage-new-header">
                            <div className="homepage-new-icon"><img src={`${process.env.PUBLIC_URL}/calendar.png`} alt="logo" /></div>
                            <div className="homepage-new-date">{date}</div>
                        </div>
                        <div className="homepage-new-description">
                            {description}
                        </div>
                    </div>
                </Link>
        </div>
		</React.Fragment>
	);
};

export default New;
