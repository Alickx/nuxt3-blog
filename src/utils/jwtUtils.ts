import jwt from 'jsonwebtoken';

const secret_key = import.meta.env.VITE_JWT_SECRET_KEY;

export function create(payload: any, options?: any) {
  return jwt.sign(payload, secret_key, options);
}

export function verify(token: string) {
  return jwt.verify(token, secret_key);
}

export function decode(token: string) {
  return jwt.decode(token);
}
