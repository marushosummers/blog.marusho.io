import React from "react"
import Helmet from 'react-helmet';
import Layout from "../components/layout"
import { Link } from "gatsby";

const notFound = () => {
  return (
    <Layout>
      <Helmet>
        <title>Not found</title>
      </Helmet>
      <div style={{textAlign: "center", padding:"5vh 0", lineHeight: "1.5"}}>
        <p style={{fontSize: "100px"}}>🎒</p>
        <p style={{fontSize: "100px", fontWeight: "bold", letterSpacing: "-0.1em"}}>404</p>
      </div>
    </Layout>
  )
}

export default notFound
