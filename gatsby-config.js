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
				],
			},
		},
		{
			resolve: `gatsby-plugin-google-analytics`,
			options: {
				// The property ID; the tracking code won't be generated without it. replace with yours
				trackingId: "UA-164289266-2",
				head: true,
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
				icon: "src/images/icon.png",
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
		`gatsby-plugin-sass`,
		`gatsby-plugin-react-helmet`,
		`gatsby-plugin-netlify-cms`,
		//"gatsby-plugin-dark-mode",
		// siteURL is a must for sitemap generation
		`gatsby-plugin-sitemap`,
		`gatsby-plugin-offline`,
	],
};
