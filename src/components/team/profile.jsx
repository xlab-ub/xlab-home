import React from "react";
import { Link } from "react-router-dom";
import { Avatar } from 'antd';

import "./styles/profile.css";

const Profile = (props) => {
	const { name, start, B_S, M_S, profile, link } = props;

	return (
		<React.Fragment>
            <Link src={link}>
                <div className="profile-container">
                    <div className="profile-img">
                        <Avatar size={120} src={<img src={`${process.env.PUBLIC_URL}/${profile}`} alt="avatar" />} />
                    </div>
                    <div className="profile-name">
                        {name}
                    </div>
                    <div className="profile-start">
                        {start}
                    </div>
                    <div className="profile-ms">
                        MS. {M_S}
                    </div>
                    <div className="profile-bs">
                        BS. {B_S}
                    </div>
                </div>
            </Link>
		</React.Fragment>
	);
};

export default Profile;
