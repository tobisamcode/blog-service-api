import { Model, Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import User from '@/resources/user/user.interface';
import HttpException from '@/utils/exceptions/http.exception';

const userSchema = new Schema(
    {
        name: {
            type: String,
            require: true,
        },

        email: {
            type: String,
            require: true,
            unique: true,
            trim: true,
        },

        password: {
            type: String,
        },

        roles: {
            type: String,
            require: true,
        },
    },
    { timestamps: true }
);

// userSchema.pre<User>('save', async function (next) {
//     if (!this.isModified('password')) {
//         next();
//     }

//     const user = await User.find({ email: this.email });
//     if (user) {
//         new HttpException(404, 'existed');
//     }
//     next();

//     const hash = await bcrypt.hash(this.password, 10);

//     this.password = hash;
//     next();
// });

userSchema.static(
    'register',
    async function register(
        name: string,
        email: string,
        password: string,
        roles: string
    ): Promise<User> {
        console.log(' static');
        // validation
        if (!email || !password) {
            console.log(' failed validation');
            throw new HttpException(404, 'All fields mus be filled');
        }

        const exists = await this.findOne({ email });
        if (exists) {
            console.log(' user exists ');
            throw new HttpException(404, 'Email already in use');
        }

        const hash = await bcrypt.hash(password, 10);
        const user = await this.create({ name, email, password: hash, roles });
        return user;
    }
);

userSchema.methods.isValidPassword = async function (
    password: string
): Promise<Error | boolean> {
    return await bcrypt.compare(password, this.password);
};

export interface IUserModel extends Model<User> {
    register: (
        name: string,
        email: string,
        password: string,
        roles: string
    ) => Promise<User>;
}

export default model<User, IUserModel>('User', userSchema);
