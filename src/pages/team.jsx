import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';

import NavBar from "../components/common/navBar";
import Footer from "../components/common/footer";
import Logo from "../components/common/logo";
import AllProfiles from "../components/team/allProfile";

import INFO from "../data/user";
import SEO from "../data/seo";

import "./styles/team.css";

const Team = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const currentSEO = SEO.find((item) => item.page === "team");

	return (
		<React.Fragment>
			<Helmet>
				<title>{`Team | ${INFO.main.title}`}</title>
				<meta name="description" content={currentSEO.description} />
				<meta name="keywords" content={currentSEO.keywords.join(", ")} />
			</Helmet>
			<div className="page-content">
				<NavBar active="team" />
				<div className="content-wrapper">
					<div className="login-button">
						<Link to="/xlab-home/team/login" className="login-link">Login</Link>
					</div>
					<div className="team-logo-container">
						<div className="team-logo">
							<Logo width={80} />
						</div>
					</div>

					<div className="team-main-container">
						<div className="title">
							Curiosity-driven AI Systems Research.
						</div>

						<div className="team-img">
							<img src={`${process.env.PUBLIC_URL}/banner.jpg`} alt="about" />
						</div>
						
						<div className="team-wrapper">
							<AllProfiles />
						</div>
					</div>
					<hr />
					<Footer />
				</div>
			</div>
		</React.Fragment>
	);
};

export default Team;
