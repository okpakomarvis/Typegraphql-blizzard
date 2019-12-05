import express,{Request} from "express";
import { ObjectType, Field} from "type-graphql";

@ObjectType()
export class AuthUser {
    @Field()
    userId: string

    @Field()
    token: string

    @Field()
    tokenExpiration: number

    @Field()
    name: string
}
@ObjectType()
export class Key {
    @Field()
    href:string 

}

@ObjectType()
export class Achieve {
    @Field()
    name: string

    @Field()
    id: string
}

@ObjectType()
export class Collections {
    @Field()
    name: string

    @Field()
    key: string

    @Field()
    id: string
}
export interface MyContext {
    req:Request;
}


export interface AuthRequest extends express.Request {
   req: Request;
  }

export interface User{
    userId: string

}
