import api from "lib/api";
import React from "react";
import CustomList from "@/components/CustomList";
export const dateFormat = "YYYY-MM-DD HH:mm:ss";

const Index = (props) => {
  return <CustomList {...props} />;
};

Index.getInitialProps = async (ctx) => {
  const { req, query, res } = ctx;
  // if (res) {
  //   res?.writeHead(302, {
  //     Location: login,
  //   });
  //   res?.end();
  // } else {
  //   Router.replace(login);
  // }
  const resp = await api.request(
    {
      url: `/post?pageSize=${query.pageSize || 10}&pageNo=${query.pageNo || 1}`,
    },
    ctx
  );

  return {
    list: resp.data.data,
  };
};

export default Index;
