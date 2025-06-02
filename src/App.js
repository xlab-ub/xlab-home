/* eslint-disable react/prop-types */

import React from "react";
import { Routes, Route } from "react-router-dom";

import Homepage from "./pages/homepage";
import Team from "./pages/team";
import Research from "./pages/research";
import Publications from "./pages/publications";
import Bio from "./pages/bio";
import Opensource from "./pages/opensource";
import Events from "./pages/events";
import Blog from "./pages/blog";
import Login from "./pages/login";
import SearchComponent from './components/publications/actions.jsx';
import PlotComponent from "./components/publications/plot";
import FilterComponent from "./components/publications/filter";

import "./app.css";
import './static/css/main.scss'

function App() {

	return (
		<div className="App">
			<Routes>
				<Route path="/xlab-home/" element={<Homepage />} />
				<Route path="/xlab-home/bio" element={<Bio />} />
				<Route path="/xlab-home/blog" element={<Blog />} />
				<Route path="/xlab-home/events" element={<Events />} />
				<Route path="/xlab-home/team" element={<Team />} />
				<Route path="/xlab-home/research" element={<Research />} />
				<Route path="/xlab-home/search" element={<SearchComponent />} />
				<Route path="/xlab-home/plot" element={<PlotComponent />} />
				<Route path="/xlab-home/filter" element={<FilterComponent />} />
				<Route path="/xlab-home/publications" element={<Publications />} />
				<Route path="/xlab-home/opensource" element={<Opensource />} />
				<Route path="/xlab-home/team/login" element={<Login/>} />
			</Routes>
		</div>
	);
}

export default App;
