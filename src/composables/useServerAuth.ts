import jwt from "jsonwebtoken";
import { getCookie, H3Event } from "h3";

export default () => {
  const SECRET = import.meta.env.VITE_AUTH_SECRET as string;
  const cookieName = "auth:token";

  const auth = (event: H3Event) => {
    let token = getCookie(event, cookieName);
    if (!token) {
      return false;
    }
    try {
      jwt.verify(token, SECRET);
      return true;
    } catch (e) {
      return false;
    }
  };

  return {
    auth,
  };
};
