import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config()

const DB_URL = process.env.DATABASE_URL
const DB_NAME = process.env.DATABASE_NAME

mongoose.connect(`${DB_URL}/${DB_NAME}`);

export default mongoose;
