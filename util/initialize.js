import { authAdmin } from "redux/actions";
import { getCookie } from "./cookie";
/**
 * 进入系统初始化函数，用于用户授权相关
 * @param {Object} ctx
 */
export default function initialize(ctx) {
  const { req, store } = ctx;
  const user = getCookie("user", req);
  const userSig = getCookie("user.sig", req);
  if (user && userSig) {
    // 已经登录
    store.dispatch(authAdmin(true));
    // store.dispatch(storeCookie());
  }
}
