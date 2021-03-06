import React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import "prismjs/themes/prism-okaidia.css";

const Layout = ({ children }) => {
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
				<div className="footer-links">
					<div className="footer-link"><Link to="/">Top</Link></div>
					<div className="footer-link"><Link to="/tags/scrap">Scrap</Link></div>
					<div className="footer-link"><Link to="/about">About</Link></div>
				</div>
					&copy; {new Date().getFullYear()} mashtech created by{" "}
					<a href="https://marusho.io/">marusho</a>
			</footer>
		</div>
	);
};

export default Layout;
