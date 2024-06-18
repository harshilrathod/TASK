import * as mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();

mongoose
    .connect(process.env.DB_URL as string)
    .then(() => console.log('Connection Success'))
    .catch((e) => console.log(e));

const connect = mongoose.connection;

export default connect;
