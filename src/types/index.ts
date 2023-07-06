interface User {
  username: string;
  password: string;
}

interface Article {
  id: string
  title: string
  abstract: string
  content: string
  cover: string
  createdAt: string
  updatedAt: string
}

interface result {
  code: number
  msg: string
  data: any
}
