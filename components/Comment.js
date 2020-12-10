import { withRouter } from "next/router";
import Gitalk from "gitalk";
import { useEffect } from "react";

const Comment = () => {
  useEffect(() => {
    var gitalk = new Gitalk({
      clientID: "19aa34dffb8b36381787",
      clientSecret: "fd85e1656cd62900d8a3fc4d9a2f3af40e4ce10d",
      repo: "next-blog-comment",
      owner: "XShellv",
      admin: ["XShellv"],
      id: window.location.pathname,
      distractionFreeMode: false,
    });
    gitalk.render("gitalk-container");
  }, []);
  return <div id="gitalk-container"></div>;
};

export default withRouter(Comment);
