import Comment from "@/components/Comment";
import api from "../lib/api";
import { Card, Col, Row, Spin } from "antd";
import React from "react";
import MarkdownRenderer from "@/components/MarkdownRenderer";

const About = ({ content }) => {
  return (
    <div>
      {/* <Head>
        <title>关于我</title>
        <meta property="og:title" content="My page title" key="about" />
        <script src="/static/js/prism.js"></script>
      </Head> */}
      <Card
        bordered={false}
        style={{ position: "relative", minHeight: 300 }}
        size="small"
      >
        {/* <div
          className="me-post "
          style={{
            backgroundImage: `url(/static/me.jpg)`,
          }}
        /> */}
        <MarkdownRenderer content={content} />
      </Card>
      <Card bordered={false}>
        <Comment />
      </Card>
    </div>
  );
};

// interface Context extends NextPageContext {
//   // any modifications to the default context, e.g. query types
// }

About.getInitialProps = async (ctx) => {
  const resp = await api.request({ url: `/me` }, ctx);
  return {
    content: resp.data.data.content,
  };
};

export default About;
