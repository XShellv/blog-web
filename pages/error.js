import React from "react";

const Error = ({ statusCode }) => {
  let msg = "";
  switch (statusCode) {
    case 404:
      msg = "Not Found";
      break;
    case 500:
      msg = "Server Error";
      break;
    default:
  }
  return (
    <h1>
      {statusCode} - {msg}
    </h1>
  );
};

Error.defaultProps = {
  statusCode: 404,
};
export default Error;
