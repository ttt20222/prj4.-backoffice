import "dotenv/config";

export const DATABASE_URL = process.env.DATABASE_URL;
export const SERVER_PORT = process.env.SERVER_PORT;

/** S3 Multer 관련 **/
export const AWS_S3_REGION = process.env.AWS_S3_REGION;
export const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
export const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
export const AWS_BUCKET = process.env.AWS_BUCKET;
