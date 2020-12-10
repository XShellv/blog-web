import { forwardRef, useEffect } from "react";
const MarkdownIt = require("markdown-it");
const md = new MarkdownIt({
  html: true,
  linkify: true,
});

const MarkdownRenderer = forwardRef((props, ref) => {
  const { content } = props;

  return (
    <div className="markdown-body">
      <div ref={ref} dangerouslySetInnerHTML={{ __html: md.render(content) }} />
    </div>
  );
});

export default MarkdownRenderer;
