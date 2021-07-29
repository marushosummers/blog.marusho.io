const path = require(`path`);
const _ = require(`lodash`);

exports.createPages = async ({ actions, graphql, reporter }) => {
	const { createPage } = actions;

	const blogPostTemplate = path.resolve(`src/templates/blogTemplate.js`);
	const tagTemplate = path.resolve(`src/templates/tags.js`);

	const result = await graphql(`
		{
			allMarkdownRemark(
				sort: { order: DESC, fields: [frontmatter___date] }
				limit: 1000
			) {
				edges {
					node {
						id
						frontmatter {
							path
							tags
						}
					}
				}
			}
			tagsGroup: allMarkdownRemark(limit: 2000) {
				group(field: frontmatter___tags) {
					fieldValue
				}
			}
		}
	`);

	// Handle errors
	if (result.errors) {
		reporter.panicOnBuild(`Error while running GraphQL query.`);
		return;
	}

	result.data.allMarkdownRemark.edges.forEach(({ node }) => {
		createPage({
			path: node.frontmatter.path,
			component: blogPostTemplate,
			context: {}, // additional data can be passed via context
		});
	});

	result.data.tagsGroup.group.forEach((tag) => {
		createPage({
			path: `/tags/${_.kebabCase(tag.fieldValue)}`,
			component: tagTemplate,
			context: {
				tag: tag.fieldValue,
			},
		});
	});
};
