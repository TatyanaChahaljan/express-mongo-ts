import mongoose, { Schema, Document } from 'mongoose';
import validator from 'validator';

export interface User extends Document {
    firstName: string,
    lastName: string,
    userName: string,
    password: string,
    email: string;
    token?: string;
}

const UserSchema: Schema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    userName: {type: String, required: true},
    password: {type: String, required: true},
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: `{VALUE} is not email`,
            isAsync: false
        }
    },
    token: {type: String},
}, {timestamps: true});

UserSchema.set('toJSON', {virtuals: true});
UserSchema.index('email', {unique: true});

export const User = mongoose.model<User>('User', UserSchema);
