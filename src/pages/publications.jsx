import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Anchor, Col, Row, Statistic } from 'antd';
import CountUp from 'react-countup';
import NavBar from "../components/common/navBar";
import Footer from "../components/common/footer";
import Logo from "../components/common/logo";
import Publication from "../components/publications/publication";
import Patent from "../components/publications/patent";
import Book from "../components/publications/book";

import INFO from "../data/user";
import SEO from "../data/seo";
import LibraryINFO from "../data/publications";

import "./styles/publications.css";
import Toolbox from "../components/publications/toolbox";

const formatter = (value) => <CountUp end={value} separator="," />;

const Publications = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const currentSEO = SEO.find((item) => item.page === "publications");

	return (
		<React.Fragment>
			<Helmet>
				<title>{`Publications | ${INFO.main.title}`}</title>
				<meta name="description" content={currentSEO.description} />
				<meta
					name="keywords"
					content={currentSEO.keywords.join(", ")}
				/>
			</Helmet>

			<div className="page-content">
				<NavBar active="publications" />
				<div className="content-wrapper">
					<div className="publications-logo-container">
						<div className="publications-logo">
							<Logo width={80} />
						</div>
					</div>

					<div className="publications-main-container">
						<div className="title publications-title">
							{INFO.publications.title}
						</div>

						<div className="publications-img">
							<img
								src={`${process.env.PUBLIC_URL}/banner.jpg`}
								alt="about"
							/>
						</div>

						<div className="subtitle publications-subtitle">
							{INFO.publications.description}
						</div>

						<div className="publications-container">
							<div className="publications-wrapper">
								<Row>
									<Col span={20}>
										<div id="part-1" className="section-container">
											<div className="section-title">Conferences</div>
											{LibraryINFO.Conferences.map((item, index) => (
												<div
													className="publications-article"
													key={(index + 1).toString()}
												>
													<Publication
														key={(index + 1).toString()}
														date={item.date}
														source={item.source}
														title={item.title}
														author={item.author}
														paper_link={item.paper_link}
														code_link={item.code_link}
													/>
												</div>
											))}
										</div>
										<div id="part-2" className="section-container">
											<div className="section-title">Journals</div>
											{LibraryINFO.Journals.map((item, index) => (
												<div
													className="publications-article"
													key={(index + 1).toString()}
												>
													<Publication
														key={(index + 1).toString()}
														date={item.date}
														source={item.source}
														title={item.title}
														author={item.author}
														paper_link={item.paper_link}
														code_link={item.code_link}
													/>
												</div>
											))}
										</div>
										<div id="part-3" className="section-container">
											<div className="section-title">Invited Papers</div>
											{LibraryINFO.InvitedPapers.map((item, index) => (
												<div
													className="publications-article"
													key={(index + 1).toString()}
												>
													<Publication
														key={(index + 1).toString()}
														date={item.date}
														source={item.source}
														title={item.title}
														author={item.author}
														paper_link={item.paper_link}
														code_link={item.code_link}
													/>
												</div>
											))}
										</div>
										<div id="part-4" className="section-container">
											<div className="section-title">Workshops</div>
											{LibraryINFO.Workshops.map((item, index) => (
												<div
													className="publications-article"
													key={(index + 1).toString()}
												>
													<Publication
														key={(index + 1).toString()}
														date={item.date}
														source={item.source}
														title={item.title}
														author={item.author}
														paper_link={item.paper_link}
														code_link={item.code_link}
													/>
												</div>
											))}
										</div>
										<div id="part-5" className="section-container">
											<div className="section-title">Patents</div>
											{LibraryINFO.Patents.map((item, index) => (
												<div
													className="publications-article"
													key={(index + 1).toString()}
												>
													<Patent
														key={(index + 1).toString()}
														date={item.date}
														id={item.id}
														title={item.title}
														author={item.author}
													/>
												</div>
											))}
										</div>
										<div id="part-6" className="section-container">
											<div className="section-title">Bookchapters</div>
											{LibraryINFO.Bookchapters.map((item, index) => (
												<div
													className="publications-article"
													key={(index + 1).toString()}
												>
													<Book
														key={(index + 1).toString()}
														date={item.date}
														publish={item.publish}
														title={item.title}
														author={item.author}
													/>
												</div>
											))}
										</div>
									</Col>
									<Col span={4}>
									<div className="statis"><Statistic title="Total Contributions" value={342} formatter={formatter} /></div>
									<Anchor
										items={[
											{
												key: 'part-1',
												href: '#part-1',
												title: 'Conferences',
											},
											{
												key: 'part-2',
												href: '#part-2',
												title: 'Journals',
											},
											{
												key: 'part-3',
												href: '#part-3',
												title: 'Invited Papers',
											},
											{
												key: 'part-4',
												href: '#part-4',
												title: 'Workshops',
											},
											{
												key: 'part-5',
												href: '#part-5',
												title: 'Patents',
											},
											{
												key: 'part-6',
												href: '#part-6',
												title: 'Bookchapters',
											},
										]}
									/>
									</Col>
								</Row>
							</div>
							<Toolbox />
						</div>
					</div>
					<hr />
					<Footer />
				</div>
			</div>
		</React.Fragment>
	);
};

export default Publications;
