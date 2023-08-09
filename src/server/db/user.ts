import {prisma} from './prisma.ts'

export const getUserByName = async (username: string) => {
  return await prisma.user.findUnique({
    where: {
      username,
    },
  })
}
