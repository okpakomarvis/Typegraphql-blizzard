//import {plainToClass} from "class-transformer";
import { Resolver, Query, /* Ctx */ UseMiddleware} from "type-graphql";
//import axios, { AxiosResponse } from "axios";
//import { /* MyContext */Collections, /* Achieve */}  from "../user/class/authuser";
import { isAuth } from "../middleware/auth";
//import { achieveUrl /* creatureUrl , itemsUrl  */} from "../url/url";
import {    Collection,  CollectionModel  } from "../../Model/user";

@Resolver()
export class Achievement {
  @UseMiddleware(isAuth)
  @Query(() =>[Collection])
  async getCollection(
      //@Ctx() ctx: MyContext
  ){
   const createItem=   await CollectionModel.find() ;
   return createItem;
   //const users = plainToClass(createItem, Collections);

    //return users;
    /* if(!achievementData){ */
     
  /*  const achievements = await axios.get(achieveUrl) as AxiosResponse<any>;
     console.log('{collection}', achievements.data.name) */
    /*  let achieveMax= [];
     if(achievements.data.achievements){
       for(let i=0; i<achievements.data.achievements.length; i++){
         console.log('length',achievements.data.achievements.length);
           achieveMax.push(achievements.data.achievements[i])
          if(achieveMax.length ===100){
            console.log("hello", 100);
            break
          }
       }
     }
     console.log("max",achieveMax, achieveMax.length);
     
     achieveMax.map(result =>{
       console.log("result",result)
       CollectionModel.create({
        achievementCatigory:achievements.data.name,
        key:result.key.href ,
        name: result.name,
        id: result.id
      }).then((data)=>{
        console.log('sucessfully created data');
        return data
      }); 
     });  */ 
     //const achievementData = await CollectionModel.find();
     //return achievementData;
    
     
    //return achievementData;
    /* const creatures = await axios.get(creatureUrl) as AxiosResponse<any>;
    //console.log("{achieve}",achievements.data.achievements);
    //console.log(creatures.data.creature_families);
    const items = await axios.get(itemsUrl) as AxiosResponse<any>;
    //console.log(items.data.item_classes);
    const  {userId} = ctx.req.user as any;
     console.log("Request", userId);
     const collection = await CollectionModel.create({
			achievements: achievements.data.achievements,
			creatures: creatures.data.creature_families,
			items: items.data.item_classes
    }); */ 
    //console.log("sucess",collection);
    //return achievements.data.achievements;
  }
}