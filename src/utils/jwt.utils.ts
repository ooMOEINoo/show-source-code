import { sign, verify, JwtPayload, SignOptions } from 'jsonwebtoken';

import config from '@config/default';

// Destructuring Jwt keys
const { jwtPrivateSecret } = config.app.jwt;
const { jwtPublicSecret } = config.app.jwt;

// Create Token From Payload
export async function signPayloadJwt(
  payload: JwtPayload,
  options?: SignOptions | undefined
) {
  return sign(payload, jwtPrivateSecret, {
    ...(options && options),
    algorithm: 'RS256',
  });
}

// Verifying Token
export async function verifyTokenJwt(token: string) {
  try {
    return verify(token, jwtPublicSecret, { algorithms: ['RS256'] });
  } catch (err) {
    return null;
  }
}
