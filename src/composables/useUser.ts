export default () => {

  const userLogin = (user: User) => {
    return $fetch('/api/user/login', {
      method: 'post',
      body: user
    })
  };

  return {
    userLogin
  }


}
