import {Resolver, Mutation, Arg } from "type-graphql";
import bcrypt from "bcryptjs";
import {UserModel } from "../../Model/user";
import jwt from "jsonwebtoken";
import { AuthUser } from "./class/authuser";


@Resolver()
export class LoginUser {
  @Mutation(() => AuthUser)
  async Login(
    @Arg("email") email: string, 
    @Arg("password") password: string
  ):Promise<AuthUser> {
    if (!email.trim().toLowerCase || !password.trim()) {
			throw new Error('All Fields are required');
		}
    const user = await UserModel.findOne({email: email});
    if(!user){
        throw new Error("Invalid Cridentials");
    }
    const isEqual = await bcrypt.compare(password, user.password);
    if(!isEqual){
        throw new Error("invalid Cridentails");
    }
   const token = jwt.sign({ userId:user.id, email: user.email}, "TypeGraphQL",{ 
        algorithm: 'HS256',
       expiresIn:"5h"
    });
    if(!token){
        throw new Error("Ooops Something Went Wrong!")
    }
    return{
        userId: user.id,
        token: token,
        name: user.name,
        tokenExpiration: 5
    }
  }
}