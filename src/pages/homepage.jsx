import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { faMailBulk } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faTwitter,
	faGithub,
} from "@fortawesome/free-brands-svg-icons";
import Logo from "../components/common/logo";
import Footer from "../components/common/footer";
import NavBar from "../components/common/navBar";
import AllNews from "../components/news/allNews";
import AllProjects from "../components/projects/allProjects";
import Sponsor from "../components/homepage/sponsor";

import SponsorINFO from "../data/sponsor";
import INFO from "../data/user";
import SEO from "../data/seo";

import "./styles/homepage.css";

const Homepage = () => {

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const currentSEO = SEO.find((item) => item.page === "home");

	return (
		<React.Fragment>
			<Helmet>
				<title>{INFO.main.title}</title>
				<meta name="description" content={currentSEO.description} />
				<meta
					name="keywords"
					content={currentSEO.keywords.join(", ")}
				/>
			</Helmet>

			<div className="page-content">
				<NavBar active="home" />
				<div className="content-wrapper">
					<div className="homepage-logo-container">
						<div className="homepage-logo">
							<Logo width={80} />
						</div>
					</div>

					<div className="homepage-container">
						<div className="homepage-first-area">
							<div className="homepage-first-area-left-side">
								<div className="title homepage-title">
									{INFO.homepage.title}
								</div>

								<div className="subtitle homepage-subtitle">
									{INFO.homepage.description}
									<Link to="/xlab-home/bio" style={{color: '#14b8a6'}}>About me</Link>
					
								</div>

								<div className="homepage-socials"> 
									<a
										href={INFO.socials.twitter}
										target="_blank"
										rel="noreferrer"
									>
										<FontAwesomeIcon
											icon={faTwitter}
											className="homepage-social-icon"
										/>
									</a>
									<a
										href={INFO.socials.github}
										target="_blank"
										rel="noreferrer"
									>
										<FontAwesomeIcon
											icon={faGithub}
											className="homepage-social-icon"
										/>
									</a>
									<a
										href={`mailto:${INFO.main.email}`}
										target="_blank"
										rel="noreferrer"
									>
										<FontAwesomeIcon
											icon={faMailBulk}
											className="homepage-social-icon"
										/>
									</a>
								</div>
							</div>
                            
							<div className="homepage-first-area-right-side">
								<div className="homepage-image-container">
									<div className="homepage-image-wrapper">
										<img
											src={`${process.env.PUBLIC_URL}/homepage.jpg`}
											alt="about"
											className="homepage-image"
										/>
									</div>
								</div>
							</div>
						</div>
						<div className="homepage-projects">
							<Link to="/research"><div className="section-title">
								{INFO.homepage.subtitle1}
							</div></Link>
							<AllProjects />
						</div>
						<Link to="/events"><div className="section-title">
							{INFO.homepage.subtitle2}
						</div></Link>
						<div className="homepage-news">
							<AllNews />
						</div>
						<div className="section-title">
							{INFO.homepage.subtitle3}
						</div>
						<div className="homepage-recruit">
							{INFO.homepage.recruit}
						</div>
						<div className="section-title">
							{INFO.homepage.subtitle4}
						</div>
						<div className="sponsor-container ">
							{SponsorINFO.map((item, index) => (
								<div key={index} className="sponsor-wrapper">
									<Sponsor
									logo={item.logo}
									/>
								</div>
							))}
						</div>
						<hr />
						<Footer />
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default Homepage;
