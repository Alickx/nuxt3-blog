import { getUserByName } from "~/server/db/user";
import { EncryptMd5, DecryptAES } from "@/utils/cryptoUtils";
import jwt from "jsonwebtoken";

const refreshTokens: Record<number, Record<string, any>> = {};
const SECRET = import.meta.env.VITE_AUTH_SECRET as string;

export default eventHandler(async (event) => {
  const { username, password } = await readBody(event);
  const decryptPassword = DecryptAES(password);
  const userData = await getUserByName(username);
  if (!userData) {
    throw createError({ statusCode: 403, statusMessage: "用户名或密码错误" });
  }
  const md5Password = EncryptMd5(decryptPassword);
  if (userData.password !== md5Password) {
    throw createError({ statusCode: 403, statusMessage: "用户名或密码错误" });
  }

  const expiresIn = "7d";
  const refreshToken =
    Math.floor(Math.random() * (1000000000000000 - 1 + 1)) + 1;
  const user = {
    username,
    name: "User " + username,
  };

  const accessToken = jwt.sign({ ...user, scope: ["user"] }, SECRET, {
    expiresIn,
  });
  refreshTokens[refreshToken] = {
    accessToken,
    user,
  };

  return {
    token: {
      accessToken,
      refreshToken,
    },
  };
});
