import React from "react"
import Helmet from 'react-helmet';
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SNSSection from "../components/sns-section";
import Ads from "../components/GoogleAdSense";
import AdsInline from "../components/GoogleAdSenseInline";

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { site, markdownRemark } = data // data.markdownRemark holds your post data
  const { siteMetadata } = site
  const { frontmatter, tableOfContents, html } = markdownRemark
	const path = frontmatter ? frontmatter.path : "error: no path";
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
					content={`${siteMetadata.siteUrl}${frontmatter.thumbnail}`}
				/>
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:title" content={frontmatter.title} />
				<meta
					name="twitter:description"
					content={frontmatter.metaDescription}
				/>
				<meta
					name="twitter:image"
					content={`${siteMetadata.siteUrl}${frontmatter.thumbnail}`}
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
					<div className="GoogleAds">
						<AdsInline path={path} slot="5649691314"></AdsInline>
					</div>
					<div
						className="table-of-content"
						dangerouslySetInnerHTML={{ __html: tableOfContents }}
					/>
					<div
						className="blog-post-content"
						dangerouslySetInnerHTML={{ __html: html }}
					/>
					<div className="tagLink">
						<Link to={`/tags/${frontmatter.tags}/`}>#{frontmatter.tags}</Link>
					</div>
				</article>
				<SNSSection
					title={frontmatter.title}
					articleUrl={`${data.site.siteMetadata.siteUrl}${frontmatter.path}`}
				/>
				<div className="GoogleAds">
					<Ads path={path} slot="1428935772"></Ads>
				</div>
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
							tableOfContents(
								absolute: false
								pathToSlugField: "frontmatter.path"
								maxDepth: 3
							)
							frontmatter {
								date(formatString: "MMMM DD, YYYY")
								path
								title
								thumbnail
								tags
								#metaDescription
							}
						}
					}
				`;
