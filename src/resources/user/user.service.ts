import UserModel, { IUserModel } from '@/resources/user/user.model';
import token from '@/utils/token';

class UserService {
    private user: IUserModel = UserModel;

    // register a new user
    public async register(
        name: string,
        email: string,
        password: string,
        role: string
    ): Promise<String | Error> {
        try {
            console.log(' Register controller ');
            const user = await this.user.register(name, email, password, role);
            const accessToken = token.createToken(user);

            return accessToken;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    // login a user
    public async login(
        email: string,
        password: string
    ): Promise<string | Error> {
        try {
            const user = await this.user.findOne({ email });

            if (!user) {
                throw new Error('Unable to find user with that Email Address');
            }

            if (await user.isValidPassword(password)) {
                return token.createToken(user);
            }
            throw new Error('Wrong credentials given!');
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}

export default UserService;
