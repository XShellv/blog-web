import { Button, Card, Space } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import { IState } from "redux/reducer";
import CustomTag from "./CustomTag";
const friends = [
  {
    name: "LogicJake",
    href: "https://www.logicjake.xyz/",
  },
  {
    name: "Muniz Blog",
    href: "https://blog.youngzk.com/",
  },
];

const Friends = () => {
  //   const { topTags } = useSelector((state: IState) => state);
  const router = useRouter();

  return (
    <Card
      title={<h2>友链</h2>}
      className="my-card"
      bordered={false}
      size="small"
    >
      <Space size="middle">
        {friends &&
          friends.map((friend) => (
            <a
              className="friend"
              target="_blank"
              href={friend.href}
              key={friend.href}
            >
              {friend.name}
            </a>
          ))}
      </Space>
    </Card>
  );
};

export default Friends;
