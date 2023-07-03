import { DecryptAES,EncryptMd5 } from '@/utils/cryptoUtils'
import {getUserByName} from "~/server/db/user";
import {R} from "~/composables/useResult";
import {create} from '~/utils/jwtUtils'

export default defineEventHandler(async (event) => {

  const body = await readBody(event)

  const { username,password } = body

  const decryptPassword = DecryptAES(password);

  const user = await getUserByName(username);


  if (!user) {
    return R.error('用户不存在');
  }

   const md5Password = EncryptMd5(decryptPassword);

  if (user.password !== md5Password) {
    return R.error('用户名或密码错误');
  }

  const token = create({username},{expiresIn: "1d"});

  return R.ok({token});

})
