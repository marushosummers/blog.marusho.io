import React from "react"
import Helmet from 'react-helmet';
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SNSSection from "../components/sns-section";
import ogp_image from "../images/og.jpg";

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { site, markdownRemark } = data // data.markdownRemark holds your post data
  const { siteMetadata } = site
  const { frontmatter, html } = markdownRemark
  return (
		<Layout>
			<Helmet>
				<title>
					{frontmatter.title} | {siteMetadata.title}
				</title>
				<meta name="description" content={frontmatter.metaDescription} />
				<meta property="og:site_name" content={siteMetadata.title} />
				<meta
					property="og:image"
					content={`${siteMetadata.siteUrl}${ogp_image}`}
				/>
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:title" content={frontmatter.title} />
				<meta
					name="twitter:description"
					content={frontmatter.metaDescription}
				/>
				<meta
					name="twitter:image"
					content={`${siteMetadata.siteUrl}${ogp_image}`}
				/>
			</Helmet>
			<div className="blog-post-container">
				<article className="post">
					{!frontmatter.thumbnail && (
						<div className="post-thumbnail">
							<h1 className="post-title">{frontmatter.title}</h1>
							<div className="post-meta">{frontmatter.date}</div>
						</div>
					)}
					{!!frontmatter.thumbnail && (
						<div
							className="post-thumbnail"
							style={{ backgroundImage: `url(${frontmatter.thumbnail})` }}
						>
							<h1 className="post-title">{frontmatter.title}</h1>
							<div className="post-meta">{frontmatter.date}</div>
						</div>
					)}
					<div
						className="blog-post-content"
						dangerouslySetInnerHTML={{ __html: html }}
					/>
				</article>
				<SNSSection
					title={frontmatter.title}
					articleUrl={`${data.site.siteMetadata.siteUrl}${frontmatter.path}`}
				/>
			</div>
		</Layout>
	);
}

export const pageQuery = graphql`
					query($path: String!) {
						site {
							siteMetadata {
								title
								siteUrl
							}
						}
						markdownRemark(frontmatter: { path: { eq: $path } }) {
							html
							frontmatter {
								date(formatString: "MMMM DD, YYYY")
								path
								title
								thumbnail
								#metaDescription
							}
						}
					}
				`;