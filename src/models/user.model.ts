import mongoose from 'mongoose';
import { Constants } from '../helpers/constants';

const UserSchema = new mongoose.Schema(
    {
        first_name: {
            type: String,
        },
        last_name: {
            type: String,
        },
        email : {
            type: String
        },
        password: {
            type: String,
        },
        mobile_number: {
            type: String,
        },
    },
    { timestamps: true }
);

const User = mongoose.model(Constants.TABLES.USER, UserSchema);

export default User;