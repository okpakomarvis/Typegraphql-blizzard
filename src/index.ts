import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import express, {Request, NextFunction, Response} from "express";
import  mongoose from "mongoose";
import { buildSchema} from "type-graphql";
import bodyParser from "body-parser";
import { RegisterUser } from "./controller/user/register";
import  jwt from  "express-jwt";
import { LoginUser } from "./controller/user/login";
import cors from "cors";
import { Achievement } from "./controller/events/achievement";

const app = express();

const mongoUser = process.env.MONGO_USER;
const mongoPass = process.env.MONGO_PASSWORD;
const mongoDb = process.env.MONGO_DB;
const path = "/graphql";

mongoose.connect(
    `mongodb+srv://${mongoUser}:${mongoPass}@cluster0-zztt7.mongodb.net/${mongoDb}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useCreateIndex: true }
    );

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

const main = async() =>{
    const schema = await buildSchema({
        resolvers: [RegisterUser, LoginUser, Achievement],
        authChecker: ({context: {req}})=>{
          if(!req.user){
            return false
          }
          return true
        }
      });
      app.use(cors({
        credentials:true,
        origin: "http://localhost:3000"
      }));
      app.use(
        path,
        jwt({
          secret: "TypeGraphQL",
          credentialsRequired: false as any,
          getToken: function fromHeaderOrQuerystring (req) {
            if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
                return req.headers.authorization.split(' ')[1];
            } else if (req.query && req.query.token) {
              return req.query.token;
            }
            return null;
          }
        }),
      );
    const apolloServer = new ApolloServer({ schema,
        context: ({req})=>{
            return ({ req, user: req.user});
        }
    });
    
    app.use(function (err:Error, _req:Request, res:Response, next:NextFunction) {
      if (err.name === 'UnauthorizedError') {
        res.status(401).send('invalid token...');
      }
        //res.status(500).json({ message:err.message});
      return next()
    });
    // Mount a jwt or other authentication middleware that is run before the GraphQL execution
   
    apolloServer.applyMiddleware({ app, cors:false, path });
    app.listen(4000, ()=>{
         console.log('Server Started on http://localhost:4000.......🚀🏹')
    })

};

main();