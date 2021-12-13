import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import PostLink from "../components/post-link";

const Tags = ({ pageContext, data }) => {
	const { tag } = pageContext;
	const { edges, totalCount } = data.allMarkdownRemark;
	const tagHeader = `${tag} : ${totalCount} posts`;
	const Posts = edges.map((edge) => (
		<PostLink key={edge.node.id} post={edge.node} />
	));

	return (
		<Layout>
			<div className="tag-contents">
				<h1>{tagHeader}</h1>
				<div className="grids">{Posts}</div>
			</div>
		</Layout>
	);
};

Tags.propTypes = {
	pageContext: PropTypes.shape({
		tag: PropTypes.string.isRequired,
	}),
	data: PropTypes.shape({
		allMarkdownRemark: PropTypes.shape({
			totalCount: PropTypes.number.isRequired,
			edges: PropTypes.arrayOf(
				PropTypes.shape({
					node: PropTypes.shape({
						frontmatter: PropTypes.shape({
							path: PropTypes.string.isRequired,
							title: PropTypes.string.isRequired,
						}),
					}),
				}).isRequired
			),
		}),
	}),
};

export default Tags;

export const pageQuery = graphql`
	query($tag: String) {
		allMarkdownRemark(
			limit: 2000
			sort: { fields: [frontmatter___date], order: DESC }
			filter: { frontmatter: { tags: { in: [$tag] } } }
		) {
			totalCount
			edges {
				node {
					id
					excerpt(pruneLength: 250)
					frontmatter {
						date(formatString: "YYYY.MM.DD")
						title
						path
						tags
						icon
					}
				}
			}
		}
	}
`;
