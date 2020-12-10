import { Card, List, Row, Col, Avatar, Button, Tooltip } from "antd";
import React, { useState, useCallback, useEffect, FC } from "react";
import { useRouter } from "next/router";
import MyTp from "./MyTp";
export const dateFormat = "YYYY-MM-DD HH:mm:ss";

const Brief = () => {
  const router = useRouter();
  return (
    <Card className="brief-info my-card" bordered={false} size="small">
      <div className="avatar">
        <Avatar size={60} src="https://cdn.xshellv.com/avatar" />
      </div>
      <div className="me">
        <span>徐小武</span>
        <span>Xshellv</span>
        <span>
          <span className="iconfont">&#xe611;</span>上海长宁区
        </span>
      </div>
      <Button
        type="primary"
        block
        onClick={() => window.open("https://github.com/XShellv", "_blank")}
      >
        关注我
      </Button>
      <div className="options">
        <MyTp title="CSDN">
          <a target="blank" href="https://blog.csdn.net/weixin_40774527">
            <i className="iconfont">&#xeee4;</i>
          </a>
        </MyTp>

        <MyTp title="简书">
          <a target="blank" href="https://www.jianshu.com/u/dfed43ff08bc">
            <i className="iconfont">&#xeee5;</i>
          </a>
        </MyTp>

        <MyTp title="知乎">
          <a
            target="blank"
            href="https://www.zhihu.com/people/yu-zi-jiang-54-7/activities"
          >
            <i className="iconfont">&#xe600;</i>
          </a>
        </MyTp>

        <MyTp title="github">
          <a target="blank" href="https://github.com/xshellv">
            <i className="iconfont">&#xeee2;</i>
          </a>
        </MyTp>
      </div>
    </Card>
  );
};

export default Brief;
