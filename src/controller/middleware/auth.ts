import { MiddlewareFn } from "type-graphql";
import { MyContext } from "../user/class/authuser";

export const isAuth: MiddlewareFn <MyContext> = async ({ context }, next) => {
  //const {userId} = context.req.user! as any;
  if(!context.req.user){
    throw new Error("not Authenticated")
  }
  return next();
};