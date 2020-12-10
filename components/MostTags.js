import { Card } from "antd";
import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import { IState } from "redux/reducer";
import CustomTag from "./CustomTag";

const MostTags = () => {
  const { topTags } = useSelector((state) => state);
  const router = useRouter();

  return (
    <Card
      title={<h2>最热标签</h2>}
      className="most-tags my-card"
      bordered={false}
      size="small"
    >
      {topTags &&
        topTags.map((tag) => (
          <CustomTag
            key={tag.name}
            handleClick={() =>
              router.push({
                pathname: "/achieve",
                query: { tag: tag.name },
              })
            }
          >
            {tag.name} ({tag.count})
          </CustomTag>
        ))}
    </Card>
  );
};

export default MostTags;
