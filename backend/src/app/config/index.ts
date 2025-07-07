import dotenv from 'dotenv'
import path from 'path'
dotenv.config({
    path: path.join(process.cwd(), '.env'),
})
export default {
    node_env: process.env.NODE_ENV,
    port: process.env.PORT,
    database_url: process.env.DATABASE_URL || 'mongodb://localhost:27017/campers-shop-local',
    bcrypt_salt_round: process.env.BCRYPT_SALT_ROUND, 
    jwt_access_secret: process.env.JWT_ACCESS_SECRET,
    jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
    jwt_access_expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
    jwt_refresh_expiresIn: process.env.JWT_REFRESH_EXPIRES_IN
}