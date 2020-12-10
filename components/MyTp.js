import { Tooltip } from "antd";
import React, { useState, useCallback, useEffect, FC } from "react";

const MyTp = ({ children, title }) => {
  return (
    <Tooltip
      title={<span style={{ fontSize: 12 }}>{title}</span>}
      placement="bottom"
    >
      {children}
    </Tooltip>
  );
};

export default MyTp;
