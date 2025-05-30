import React from "react";
import { Link } from "react-router-dom";

import "./styles/case.css";

const Case = (props) => {
	const { paper, img, conf, description, link } = props;

	return (
		<React.Fragment>
            <Link to={link}>
                <div className="case-container">
                    <div className="case-conf-name">{conf}</div>
                    <div className="case-paper-name">{paper}</div>
                    <div className="case-img">
                        <img src={`${process.env.PUBLIC_URL}/${img}`} />
                    </div>
                    <div className="case-description">{description}</div>
                </div>
			</Link>
		</React.Fragment>
	);
};

export default Case;
