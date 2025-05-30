import React from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { GithubOutlined, FilePdfOutlined } from '@ant-design/icons';
import "./styles/cell.css";

const Cell = ({ data }) => (
  <div className="cell-container">
    <article className="mini-post">
    <header>
    <h4><a href={data.web}>{data.title}</a> <Link to={data.code}><GithubOutlined style={{ fontSize: '24px', color: '#005BBB'}}/></Link>{" "}
		<Link to={data.paper}><FilePdfOutlined style={{ fontSize: '24px', color: '#005BBB'}}/></Link>{" "}</h4>
    </header>
    <a href={data.web} className="image">
        <img src={`${process.env.PUBLIC_URL}/${data.image}`} alt={data.title} />
    </a>
    <div className="separate">
      <hr />
      <p>{data.desc}</p>
    </div>
    </article>
  </div>
);

Cell.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    link: PropTypes.string,
    image: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
  }).isRequired,
};

export default Cell;
