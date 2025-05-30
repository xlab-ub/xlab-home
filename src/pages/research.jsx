import React, {useEffect } from "react";
import { Anchor, Col, Row } from 'antd';
import { Helmet } from "react-helmet";

import NavBar from "../components/common/navBar";
import Footer from "../components/common/footer";
import Logo from "../components/common/logo";
import AllCases from "../components/research/allCase";

import ResearchINFO from "../data/research";
import INFO from "../data/user";
import SEO from "../data/seo";

import "./styles/research.css";


const Research = () => {
	useEffect(() => {
	}, []);

	const currentSEO = SEO.find((item) => item.page === "research");

	return (
		<React.Fragment>
			<Helmet>
				<title>{`Research | ${INFO.main.title}`}</title>
				<meta name="description" content={currentSEO.description} />
				<meta
					name="keywords"
					content={currentSEO.keywords.join(", ")}
				/>
			</Helmet>

			<div className="page-content">
				<NavBar active="research" />
				<div className="content-wrapper">
					<div className="research-logo-container">
						<div className="research-logo">
							<Logo width={80} />
						</div>
					</div>

					<div className="research-container">
						<div className="title research-title">
						{ResearchINFO.main.title}
						</div>
						<div className="research-img">
							<img
								src={`${process.env.PUBLIC_URL}/AI.jpg`}
								alt="about"
							/>
						</div>
						<div></div>
						<Row>
							<Col span={20}>
							<div id="alg" className="section-container">
								<div className="section-title">{ResearchINFO.main.section1.whole}</div>
								<AllCases section='section1' />
							</div>
							<div id="sol" className="section-container">
								<div className="section-title">{ResearchINFO.main.section2.whole}</div>
								<AllCases section='section2' />
							</div>
							<div id="sys" className="section-container">
								<div className="section-title">{ResearchINFO.main.section3.whole}</div>
								<AllCases section='section3' />
							</div>
							<div id="acc" className="section-container">
								<div className="section-title">{ResearchINFO.main.section4.whole}</div>
								<AllCases section='section4' />
							</div>
							<div id="sec" className="section-container">
								<div className="section-title">{ResearchINFO.main.section5.whole}</div>
								<AllCases section='section5' />
							</div>
							<div id="tool" className="section-container">
								<div className="section-title">{ResearchINFO.main.section6.whole}</div>
								<AllCases section='section6' />
							</div>
							</Col>
							<Col span={4}>
							<Anchor className="responsive-anchor"
								items={[
								{
									key: 'alg',
									href: '#alg',
									title: 'AI Algorithms',
								},
								{
									key: 'sol',
									href: '#sol',
									title: 'AI Solutions',
								},
								{
									key: 'sys',
									href: '#sys',
									title: 'AI Systems',
								},
								{
									key: 'acc',
									href: '#acc',
									title: 'AI Algorithms',
								},
								{
									key: 'sec',
									href: '#sec',
									title: 'AI Solutions',
								},
								{
									key: 'tool',
									href: '#tool',
									title: 'AI Systems',
								}
								]}
							/>
							</Col>
						</Row>
					</div>
					<hr />
					<Footer />
				</div>
			</div>
		</React.Fragment>
	);
};

export default Research;
