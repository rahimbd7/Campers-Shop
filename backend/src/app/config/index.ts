import dotenv from 'dotenv'
import path from 'path'
dotenv.config({
    path: path.join(process.cwd(), '.env'),
})
export default {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    database_url: process.env.DATABASE_URL || 'mongodb://localhost:27017/campers-shop-local',
    bcrypt_salt_round: process.env.BCRYPT_SALT_ROUND 
}