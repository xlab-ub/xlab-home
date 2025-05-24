import React, { useEffect } from "react";
// import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";

import NavBar from "../components/common/navBar";
import Footer from "../components/common/footer";
import Logo from "../components/common/logo";

import Cell from "../components/common/Cell";
import ProjectINFO from '../data/opensource';
import SEO from "../data/seo";
import INFO from "../data/user";

import "./styles/opensource.css";

const Opensource = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const currentSEO = SEO.find((item) => item.page === "opensource");

    return (
        <React.Fragment>
            <Helmet>
                <title>{`opensource | ${INFO.main.title}`}</title>
                <meta name="description" content={currentSEO.description} />
                <meta
                    name="keywords"
                    content={currentSEO.keywords.join(", ")}
                />
            </Helmet>
            <div className="page-content">
				<NavBar active="opensource" />
				<div className="content-wrapper">
					<div className="opensource-logo-container">
						<div className="opensource-logo">
							<Logo width={80} />
						</div>
					</div>

					<div className="opensource-container">
						<div className="title opensource-title">
						{ProjectINFO.main.title}
						</div>
						<div className="opensource-img">
							<img
								src="banner.jpg"
								alt="about"
							/>
						</div>
                        <div className="opensource-container">
                            <article className="post" id="projects">
                                {ProjectINFO.projects.map((project) => (
                                    <Cell
                                    data={project}
                                    key={project.title}
                                    />
                                ))}
                            </article>
                        </div>
                    </div>
                    <hr />
					<Footer />
                </div>
            </div>
        </React.Fragment>
    );
};

export default Opensource;