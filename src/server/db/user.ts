import { prisma } from "./prisma";

export const getUserByName = async (username: string) => {
  return await prisma.user.findUnique({
    where: {
      username,
    },
  });
};
