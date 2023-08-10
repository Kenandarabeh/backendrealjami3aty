import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();
cloudinary.config({
    cloud_name: process.env.COULD_NAME,
    api_key: process.env.API_KEY, // Make sure this is set correctly
    api_secret: process.env.API_SECRET,
});

export default cloudinary;
