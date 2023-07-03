import {prisma} from './prisma.js'

export const getUserByName = async (username) => {
  return await prisma.user.findUnique({
    where: {
      username,
    },
  })
}
