import React, { useEffect } from "react";
import VditorPreview from "vditor/dist/method.min";
import * as tocbot from "tocbot";

const VditorMd = (props) => {
  useEffect(() => {
    // VditorPreview.preview(document.getElementById("vditor"), props.content, {
    //   paragraphBeginningSpace: true,
    //   hljs: {
    //     style: "monokai",
    //   },
    //   after: () => {
    //     tocbot.refresh();
    //   },
    // });

    tocbot.init({
      tocSelector: ".article-toc",
      contentSelector: ".vditor-reset",
      hasInnerContainers: true,
    });
    return () => {
      tocbot.destroy();
    };
  }, [props.content]);

  return (
    <div id="vditor" className="vditor-reset">
      <div dangerouslySetInnerHTML={{ __html: props.content }}></div>
    </div>
  );
};

export default VditorMd;
