/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
	/* Your site config here */
	siteMetadata: require("./site-meta-data.json"),
	plugins: [
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `markdown-pages`,
				path: `${__dirname}/_data`,
			},
		},
		{
			resolve: `gatsby-transformer-remark`,
			options: {
				plugins: [
					{
						resolve: `gatsby-remark-autolink-headers`,
						options: {
							offsetY: `30`,
							icon: false,
							className: `remark-autolink-headers`,
							maintainCase: false,
						},
					},
					{
						resolve: `gatsby-remark-prismjs`,
						options: {
							classPrefix: "language-",
							inlineCodeMarker: null,
							aliases: {},
							showLineNumbers: false,
							noInlineHighlight: false,
						},
					},
					{
						resolve: "gatsby-remark-emojis",
					},
					{
						resolve: `gatsby-remark-external-links`,
						options: {
							rel: "noopener noreferrer",
						}
					},
				],
			},
		},
		{
    resolve: 'gatsby-plugin-google-gtag',
			options: {
				trackingIds: ['G-KLHQHBTNS4'],
				pluginConfig: {
					head: true,
					},
    	},
		},
		{
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: `mashtech`,
				short_name: `mashtech`,
				start_url: `/`,
				background_color: `#fdfdfd`,
				theme_color: `#fdfdfd`,
				display: `standalone`,
				icon: "src/images/apple-touch-icon.png",
			},
		},
		{
			resolve: "gatsby-plugin-robots-txt",
			options: {
				host: "https://blog.marusho.io",
				sitemap: "https://blog.marusho.io/sitemap.xml",
				policy: [{ userAgent: "*", allow: "/" }],
			},
		},
		{
			resolve: `gatsby-plugin-google-adsense`,
			options: {
				publisherId: `ca-pub-7961076646821939`,
			},
		},
		{
			resolve: `gatsby-plugin-feed`,
			options: {
				query: `
				{
					site {
						siteMetadata {
							title
							description
							siteUrl
							site_url: siteUrl
						}
					}
				}
			`,
				feeds: [{
					serialize: ({
						query: {
							site,
							allMarkdownRemark
						}
					}) => {
						return allMarkdownRemark.nodes.map(node => {
							return Object.assign({}, node.frontmatter, {
								description: node.excerpt,
								date: node.frontmatter.date,
								url: site.siteMetadata.siteUrl + node.frontmatter.path,
								guid: site.siteMetadata.siteUrl + node.frontmatter.path,
								custom_elements: [{
									"content:encoded": node.html
								}],
							})
						})
					},
					query: `
						{
							allMarkdownRemark(
								sort: { order: DESC, fields: [frontmatter___date] },
							) {
								nodes {
									excerpt
									html
									frontmatter {
										title
										path
										date
									}
								}
							}
						}
					`,
					output: "/rss.xml",
					title: "Mashtech RSS Feed",
				}, ],
			},
		},
		`gatsby-plugin-sass`,
		`gatsby-plugin-react-helmet`,
		`gatsby-plugin-netlify-cms`,
		//"gatsby-plugin-dark-mode",
		// siteURL is a must for sitemap generation
		`gatsby-plugin-sitemap`,
		`gatsby-plugin-offline`,
	],
};
