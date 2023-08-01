export default () => {

  const userLogin = async (user: User): Promise<Result<string>> => {
    return await $fetch('/api/user/login', {
      method: 'post',
      body: user
    })
  };

  return {
    userLogin
  }


}
