import { prisma } from './prisma.js'

export const getUserByEmail = async (email) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  })
  return user
}
