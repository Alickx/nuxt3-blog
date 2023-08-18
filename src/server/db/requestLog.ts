import { prisma } from "./prisma";

export const createLog = async (data: any) => {
  await prisma.requestLog.create({
    data,
  });
}


