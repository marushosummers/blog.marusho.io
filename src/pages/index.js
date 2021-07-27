import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import PostLink from "../components/post-link";
import HeroHeader from "../components/heroHeader";
import ogp_image from "../images/og.jpg";

const IndexPage = ({
  data: {
    site,
    allMarkdownRemark: { edges }
  }
}) => {
  const Posts = edges
    .filter((edge) => !!edge.node.frontmatter.date) // You can filter your posts based on some criteria
    .map((edge) => <PostLink key={edge.node.id} post={edge.node} />);

  return (
		<Layout>
			<Helmet>
				<title>{site.siteMetadata.title}</title>
				<meta name="description" content={site.siteMetadata.description} />
				<meta property="og:site_name" content={site.siteMetadata.title} />
				<meta
					property="og:image"
					content={`${site.siteMetadata.siteUrl}${ogp_image}`}
				/>
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:title" content={site.siteMetadata.title} />
				<meta
					name="twitter:description"
					content={site.siteMetadata.description}
				/>
				<meta
					name="twitter:image"
					content={`${site.siteMetadata.siteUrl}${ogp_image}`}
				/>
			</Helmet>
			<HeroHeader />
			<div className="grids">{Posts}</div>
		</Layout>
	);
};

export default IndexPage;
export const pageQuery = graphql`
					query indexPageQuery {
						site {
							siteMetadata {
								title
								description
								siteUrl
							}
						}
						allMarkdownRemark(
							sort: { order: DESC, fields: [frontmatter___date] }
						) {
							edges {
								node {
									id
									excerpt(pruneLength: 250)
									frontmatter {
										date(formatString: "MMMM DD, YYYY")
										path
										title
										thumbnail
									}
								}
							}
						}
					}
				`;
