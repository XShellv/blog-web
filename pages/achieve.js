import CustomTag from "@/components/CustomTag";
import api from "../lib/api";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Timeline, Card, Pagination } from "antd";
import classNames from "classnames";
import { IPosts, dateFormat } from "@/components/CustomList";
import React from "react";
import { useQuery } from "@/hooks/useQuery";
import moment from "moment";

const Achieve = ({ tags, posts }) => {
  const router = useRouter();
  const { query, jumpTo, getQuery } = useQuery();
  const tag = getQuery("tag") || "";
  const pageNo = getQuery("pageNo") * 1 || 1;
  const pageSize = getQuery("pageSize") || 10;

  return (
    <div id="achieve-wrapper">
      <Head>
        <title>归档</title>
        <meta property="og:title" content="My page title" key="about" />
      </Head>
      <Card bordered={false} size="small">
        <div className="tags">
          <CustomTag
            key="total"
            className={classNames({ active: tag === "" })}
            handleClick={() => {
              query.set("tag", "");
              query.set("pageNo", "1");
              jumpTo(query);
            }}
          >
            全部 ({tags.total})
          </CustomTag>
          {tags.data.map(t => (
            <CustomTag
              key={t.name}
              className={classNames({ active: tag === t.name })}
              handleClick={() => {
                query.set("tag", t.name);
                query.set("pageNo", "1");
                jumpTo(query);
              }}
            >
              {t.name} ({t.count})
            </CustomTag>
          ))}
        </div>
        <Timeline>
          {posts.rows.map((item) => {
            return (
              <Timeline.Item>
                <div className="content">
                  <Link href={`/article/${item.id}`}>
                    <a>{item.title}</a>
                  </Link>
                  <span className="time">
                    {moment(new Date(item.createdAt).valueOf()).format(
                      dateFormat
                    )}
                  </span>
                </div>
                <div className="timeline-tags">
                  {item.tags.map((tag) => (
                    <CustomTag key={tag.name}>{tag.name}</CustomTag>
                  ))}
                </div>
              </Timeline.Item>
            );
          })}
        </Timeline>
        <Pagination
          total={posts.count}
          showTotal={(total) => `共 ${total} 篇`}
          pageSize={pageSize}
          current={pageNo}
          onChange={(pageNo, pageSize) => {
            query.set("pageNo", pageNo + "");
            query.set("pageSize", pageSize + "");
            jumpTo(query);
          }}
          onShowSizeChange={(pageNo, pageSize) => {
            query.set("pageNo", pageNo + "");
            query.set("pageSize", pageSize + "");
            jumpTo(query);
          }}
          size="small"
          showQuickJumper
          showSizeChanger
          pageSizeOptions={["10", "20", "50"]}
        />
      </Card>
    </div>
  );
};

Achieve.getInitialProps = async (ctx) => {
  const { res, req, query } = ctx;
  const resp = await Promise.all([
    api.request({ url: `/tags` }, ctx),
    api.request(
      {
        url: `/post?pageSize=${query.pageSize || 10}&pageNo=${
          query.pageNo || 1
        }&tag=${encodeURI(query.tag || "")}`,
      },
      ctx
    ),
  ]);
  return {
    tags: {
      data: resp[0].data.data,
      total: resp[0].data.total,
    },
    posts: resp[1].data.data,
  };
};

export default Achieve;
