import {useHttp} from "~/composables/useHttp";

export default () => {

  const userLogin = async (user: User) => {
    return $fetch('/api/user/login', {
      method: 'post',
      body: user
    })
  };

  return {
    userLogin
  }


}
