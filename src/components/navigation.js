import React from "react";
import { Link } from "gatsby";
import ThemeChanger from "../components/themeChanger";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";

export default (props) => (
	<nav className="navigation">
		{/*<Link to="/contact">Contact</Link>*/}
		<Link to="/about">About</Link>
		<a style={{ boxShadow: "none" }} href="https://twitter.com/marusho_summers">
			<FontAwesomeIcon
				style={{ height: "1.3em", width: "1.3em" }}
				icon={faTwitter}
			/>
		</a>
		<a style={{ boxShadow: "none" }} href="https://github.com/marushosummers">
			<FontAwesomeIcon
				style={{ height: "1.3em", width: "1.3em" }}
				icon={faGithub}
			/>
		</a>
		<ThemeChanger />
	</nav>
);
