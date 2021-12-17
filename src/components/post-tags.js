import React from "react"
import { Link } from "gatsby"

const PostTag = ({ tags }) => (
  <div className="tags">
    <ul>
    {
      tags.map((tag, index) => (
        <li className="tagLink" key={index}>
          <Link to = {
              `/tags/${tag.toLowerCase()}/`}>#{tag}</Link>
        </li>
        )
      )
    }
    </ul>
  </div>
)
export default PostTag
