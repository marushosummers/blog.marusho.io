import React from "react"
import { Link } from "gatsby"

const PostLink = ({ post }) => (
  <Link to={post.frontmatter.path} className="card-link">
    <article className="card">
      <div className="post-icon">{post.frontmatter.icon ?? "🦊"}</div>
      <header>
        <h2 className="post-title">
          {post.frontmatter.title}
        </h2>
      <div className="post-meta">{post.frontmatter.date}</div>
      </header>
    </article>
  </Link>
)
export default PostLink
