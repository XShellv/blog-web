import React, { useEffect, useState } from "react";
import { ConfigProvider, Layout } from "antd";
import zhCN from "antd/lib/locale/zh_CN";
import "../style/index.less";
import "vditor/dist/index.css";
import api from "../lib/api";
import { useDispatch, useSelector } from "react-redux";
import {
  setUserInfo,
  setLoading,
  setStatus,
  initStatus,
  setTopTags,
} from "../redux/actions";
import { wrapper } from "../redux/store";
import Error from "./error";
import CustomLayout from "@/layout/Layout";
import { Router } from "next/router";
import initialize from "../util/initialize";

// const setRem = async () => {
//   await require("../public/static/js/flexible");
// };

function MyApp({ Component, pageProps }) {
  const { isAdmin, statusCode } = useSelector((state) => state);
  const dispatch = useDispatch();
  // useEffect(()=>{
  //     setRem()
  //     window && window.addEventListener('resize',setRem)
  // })

  useEffect(() => {
    Router.events.on("routeChangeStart", startLoading);
    Router.events.on("routeChangeComplete", stopLoading);
    Router.events.on("routeChangeError", stopLoading);

    return () => {
      Router.events.off("routeChangeStart", startLoading);
      Router.events.off("routeChangeComplete", stopLoading);
      Router.events.off("routeChangeError", stopLoading);
    };
  }, []);

  const startLoading = () => {
    dispatch(setLoading(true));
    dispatch(initStatus());
  };

  const stopLoading = () => {
    dispatch(setLoading(false));
  };

  let renderContent;
  if (statusCode !== 200) {
    renderContent = <Error statusCode={statusCode} />;
  } else if (Component.name === "Error") {
    renderContent = <Error />;
  } else {
    renderContent = (
      <CustomLayout>
        <Component {...pageProps} />
      </CustomLayout>
    );
  }

  return <ConfigProvider locale={zhCN}>{renderContent}</ConfigProvider>;
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {};
  /** 应用初始化, 一定要在Component.getInitiialProps前面
   *  因为里面是授权，系统最优先的逻辑
   *  传入的参数是ctx，里面包含store和req等
   **/
  initialize(ctx);
  let list = [];
  list.push(
    api.request({ method: "POST", url: "/topTags", data: { top: 10 } }, ctx)
  );
  // if (ctx.store.getState().isAdmin) {
  //   list.push(api.request({ url: "/user/info" }, ctx));
  //   // const resp: any = await api.request({ url: "/user/info" }, ctx);
  //   // ctx.store.dispatch(setUserInfo(resp.data));
  // } else {
  //   ctx.store.dispatch(setUserInfo(null));
  // }
  const resp = await Promise.all(list);
  ctx.store.dispatch(setTopTags(resp[0].data.data));
  if (resp[1]) {
    ctx.store.dispatch(setUserInfo(resp[1].data));
  }
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  return { pageProps, Component };
};

// export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
//   store.dispatch(tickClock(false));
// });

export default wrapper.withRedux(MyApp);
