import dotenv from 'dotenv'
import path from 'path'
dotenv.config({
    path: path.join(process.cwd(), '.env'),
})

//mongodb+srv://rahimbd7:<db_password>@cluster0.tmt3t8e.mongodb.net/
export default {
    node_env: process.env.NODE_ENV,
    port: process.env.PORT,
    database_url: process.env.DATABASE_URL || 'mongodb://localhost:27017/campers-shop-local',
    bcrypt_salt_round: process.env.BCRYPT_SALT_ROUND, 
    jwt_access_secret: process.env.JWT_ACCESS_SECRET,
    jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
    jwt_access_expiresIn: process.env.JWT_ACCESS_SECRET_EXPIRED_IN,
    jwt_refresh_expiresIn: process.env.JWT_REFRESH_SECRET_EXPIRED_IN,
    cloudinary_name: process.env.CLOUDINARY_NAME,
    cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
    cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET
}