import React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import "prismjs/themes/prism-okaidia.css";

export default ({ children }) => {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  );
  return (
		<div className="site-wrapper">
			<header className="site-header">
				<div className="site-title">
					<Link to="/">{data.site.siteMetadata.title}</Link>
				</div>
			</header>
			{children}
			<footer className="site-footer">
				<span role="img" aria-label="marusho">
					🦊
				</span>
				<p></p>
				<p>
					&copy; {new Date().getFullYear()} mashtech created by{" "}
					<a href="https://twitter.com/marusho_summers">marusho</a>
				</p>
			</footer>
		</div>
	);
};
