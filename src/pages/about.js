import React from "react"
import Helmet from "react-helmet"
import { graphql } from 'gatsby'
import Layout from "../components/layout"

const About = ({
  data: {
    site
  },
}) => {
  return (
		<Layout>
			<Helmet>
				<title>About — {site.siteMetadata.title}</title>
				<meta
					name="description"
					content={"About page of " + site.siteMetadata.description}
				/>
			</Helmet>
			<div className="blog-post-container">
				<article className="post">
					<div className="blog-post-content">
						<h1>About - {site.siteMetadata.title}</h1>
						<h2>ブログについて</h2>
						<p>
							こんにちは、marushoです🦊
						</p>
						<p>
							プログラミングの学習記録、個人開発、ほか趣味について備忘録として書き散らかしています。
						</p>
						<p>
							経歴・プロフィールは<a href="https://marusho.io/" target="_blank" rel="noopener noreferrer">こちら</a>
						</p>
						<h2>お問い合わせ</h2>
						<ul>
							<li><a href="https://forms.gle/krbqfZvHsDxZy7BM6" target="_blank" rel="noopener noreferrer">お問い合わせフォーム</a></li>
							<li>
							<a href="https://twitter.com/marusho_summers" target="_blank" rel="noopener noreferrer">Twitter</a>
							</li>
						</ul>

						<h2>プライバシーポリシー</h2>
						<p>
							mashtech（以下，「当サイト」といいます。）は，ユーザーの個人情報もしくはそれに準ずる情報の取扱いについて，以下のとおりプライバシーポリシーを定めます。
						</p>
						<p>
							当サイトは、個人情報に関する法令を遵守し、取扱う個人情報の取得、利用、管理を適正に行います。
						</p>
						<h3>アクセス解析ツールについて</h3>
						<p>
							当サイトでは、Googleによるアクセス解析ツール「Googleアナリティクス」を利用しています。
						</p>
						<p>
							このGoogleアナリティクスはトラフィックデータの収集のためにCookieを使用しています。
						</p>
						<p>
							トラフィックデータは匿名で収集されており、個人を特定するものではありません。
						</p>
						<p>
							Cookieの利用については、Webブラウザのユーザー設定により拒否をすることができます。
						</p>
						<h3>掲載されている広告について</h3>
						<p>当サイトは、第三者の広告配信サービスを利用しています。</p>
						<p>
							広告配信事業者は、Cookieを利用することで、ユーザが当サイトに訪れた情報や、他サイトに訪れた情報に基づき、適切な広告を表示します。
						</p>
						<p>
							Cookieの利用については、Webブラウザのユーザー設定により拒否をすることができます。
						</p>
						<h3>プライバシーポリシーの変更</h3>
						<p>
							本ポリシーの内容は、法令に遵守することを目的とし、ユーザに予告なく変更するものとします。
						</p>

						<p>2021年 7月 1日 策定</p>
					</div>
				</article>
			</div>
		</Layout>
	);
}
export default About
export const pageQuery = graphql`
					query AboutQuery {
						site {
							siteMetadata {
								title
								description
							}
						}
					}
				`;
