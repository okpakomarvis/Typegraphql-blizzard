import { Resolver, Mutation, Arg } from 'type-graphql';
import bcrypt from 'bcryptjs';
import { User, UserModel } from '../../Model/user';
import { isEmail } from '../../utillity/utility';

@Resolver()
export class RegisterUser {
	@Mutation(() => User)
	async Register(
		@Arg('name') name: string,
		@Arg('email') email: string,
		@Arg('password') password: string
	): Promise<User> {
		if (!name.trim() || !email.trim().toLowerCase || !password.trim()) {
			throw new Error('All Fields are required');
		}
		if (password.length < 5) {
			throw new Error('password must be 6 characters or more');
		}
		if (!isEmail(email)) {
			throw new Error('Invalid email');
		}
		const existingUsers = await UserModel.findOne({ email: email });
		if (existingUsers) {
			throw new Error('Email Already in used');
		}
		const hashPassword = await bcrypt.hash(password, 12);
		const user = await UserModel.create({
			name: name,
			password: hashPassword,
			email: email
		});
		console.log(user);
		return user;
	}
}
