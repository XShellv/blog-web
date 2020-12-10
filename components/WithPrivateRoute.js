import React from "react";
import { useSelector } from "react-redux";
import { setStatus } from "redux/actions";

const WithPrivateRoute = (WrappedComponent) => {
  const hocComponent = ({ ...props }) => {
    const { userInfo, isAdmin } = useSelector((state) => state);
    return <WrappedComponent {...props} />
    // return isAdmin ? (
    //   <WrappedComponent {...props} />
    // ) : (
    //   <Error statusCode={404} />
    // );
  };

  hocComponent.getInitialProps = async (ctx) => {
    const { store } = ctx;
    const { isAdmin } = store.getState();
    if (WrappedComponent.getInitialProps && isAdmin) {
      const wrappedProps = await WrappedComponent.getInitialProps(ctx);
      return { ...wrappedProps };
    } else {
      ctx.store.dispatch(setStatus(404));
    }
  };

  return hocComponent;
};

export default WithPrivateRoute;
