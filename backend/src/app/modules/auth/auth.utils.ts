import jwt from 'jsonwebtoken';
interface JwtPayload {
    id?: string,
    email?: string | null,
    role?: string,
}
export const createToken = (jwtPayload: JwtPayload, secret: string, expiresIn: string) => {
    return jwt.sign(jwtPayload, secret, {
        expiresIn
    })
}

export const verifyToken = (token: string, secret: string) => {
    return jwt.verify(token, secret);
}