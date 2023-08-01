interface User {
  username: string;
  password: string;
}

interface Result<T> {
  code: number
  msg: string
  data: T
}

interface PageResult<T> {
  code: number
  msg: string
  data: {
    total: number
    records: T[]
  }
}
