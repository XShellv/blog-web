import Link from "next/link";
import { Card, List, Row, Col, Avatar, Button } from "antd";
import CustomTag from "@/components/CustomTag";
import { useQuery } from "@/hooks/useQuery";
import React from "react";
import moment from "moment";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { IState } from "redux/reducer";
export const dateFormat = "YYYY-MM-DD HH:mm:ss";

const CustomList = ({ list }) => {
  const { query, getQuery, jumpTo } = useQuery();
  const pageNo = getQuery("pageNo") * 1 || 1;
  const pageSize = getQuery("pageSize") || 10;
  const loading = useSelector((state) => state.loading);

  const renderContent = list ? (
    <div id="home-wrapper">
      <List
        style={{ background: "#fff", padding: 20 }}
        bordered={false}
        size="small"
        loading={loading}
        dataSource={list.rows}
        renderItem={(row) => (
          <List.Item key={row.title}>
            <ArticleCard key={row.title} {...row} />
          </List.Item>
        )}
        pagination={{
          total: list.count,
          showTotal: (total) => `共 ${total} 篇`,
          pageSize: pageSize,
          current: pageNo,
          // hideOnSinglePage: true,
          size: "small",
          onChange: (pageNo, pageSize) => {
            query.set("pageNo", pageNo + "");
            query.set("pageSize", pageSize + "");
            jumpTo(query);
          },
          onShowSizeChange: (pageNo, pageSize) => {
            query.set("pageNo", pageNo + "");
            query.set("pageSize", pageSize + "");
            jumpTo(query);
          },
          showQuickJumper: true,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "50"],
        }}
      />
    </div>
  ) : null;
  return renderContent;
};

const ArticleCard = (props) => {
  const {
    abstract,
    title,
    content,
    category,
    like,
    read,
    createdAt,
    updatedAt,
    tags,
    id,
  } = props;

  const router = useRouter();
  const { path } = router.query;

  return (
    <div className="list-item">
      <h1 className="home-card-title">
        <Link href={`/article?id=${id}`} as={`/article/${id}`}>
          <a>{title}</a>
        </Link>
      </h1>
      <div className="home-card-extra">
        <div className="tags">
          {tags.map((tag) => (
            <CustomTag
              key={tag.name}
              handleClick={() =>
                router.push({
                  pathname: "/achieve",
                  query: { tag: tag.name },
                })
              }
            >
              {tag.name}
            </CustomTag>
          ))}
        </div>
        <div className="extra">
          <span className="time">
            发布于：{moment(new Date(createdAt).valueOf()).format(dateFormat)}
          </span>
        </div>
      </div>
      {/* <Link href={"/article?id=" + item.id} as={"/article/" + item.id}> */}
      <p className="home-card-abstract">{abstract}</p>
    </div>
  );
};

export default CustomList;
