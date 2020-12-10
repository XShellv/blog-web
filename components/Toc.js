import Link from "next/link";
import { Card, List, Row, Col, Avatar, Button, Tabs } from "antd";
import api from "lib/api";
import React, { useState, useCallback, useEffect, useRef } from "react";
import { NextPageContext, NextPage } from "next";
import moment from "moment";
import { useRouter } from "next/router";
import { refresh } from "tocbot";
import BesideInfo from "./Brief";
import MostTags from "./MostTags";
import Besides from "./Besides";
export const dateFormat = "YYYY-MM-DD HH:mm:ss";
const { TabPane } = Tabs;
const Toc = () => {
  const tocRef = useRef(null);
  const [classname, setClassName] = useState("");
  const [fresh, setRefresh] = useState(false);
  const handleScroll = () => {
    const tocDom = tocRef.current;
    if (tocDom) {
      const tocTop = tocDom.getBoundingClientRect().top;
      const scrollTop =
        document.documentElement.scrollTop ||
        window.pageYOffset ||
        document.body.scrollTop;
      if (tocTop <= 0) {
        setClassName("fixed");
      } else {
        setClassName("");
      }
    }
  };

  const handleRefresh = () => {
    setRefresh((fresh) => !fresh);
  };
  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleRefresh);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.addEventListener("resize", handleRefresh);
    };
  }, []);

  const tocDom = tocRef.current;

  return (
    <div className="toc-info" ref={tocRef}>
      <div ref={tocRef}>
        <div
          className={classname}
          style={{
            width: tocDom ? tocDom.getBoundingClientRect().width : "auto",
            fontSize: 12,
          }}
        >
          <Card size="small" className="my-card" title={<h2>目录</h2>}>
            <div className="article-toc"></div>
          </Card>
          {/* <Tabs
            defaultActiveKey="1"
            onChange={() => {}}
            style={{ background: "#fff" }}
          >
            <TabPane tab="文章目录" key="toc" forceRender={true}>
            </TabPane>
            <TabPane tab="博客概览" key="brief" className="brief">
              <Besides />
            </TabPane>
          </Tabs> */}
        </div>
      </div>
    </div>
  );
};

export default Toc;
