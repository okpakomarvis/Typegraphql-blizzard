import { prop, Typegoose,   arrayProp, Ref   } from 'typegoose';
import { ObjectType, Field, ID } from "type-graphql";
import mongoose from "mongoose";

@ObjectType()
export class Comments extends Typegoose {
    @Field(()=>ID)
    _id!: mongoose.Types.ObjectId;

    @Field()
    @prop({ required:true})
    comments!: string;

    @Field()
    @prop({ required:true})
    user!: string;

}

export const CommentModel = new Comments().getModelForClass(Comments);

@ObjectType()
export class Collection extends Typegoose{
    @Field(()=>ID)
    _id!: mongoose.Types.ObjectId;

    @Field()
    @prop()
    achievementCatigory!: string;
    
    @Field()
    @prop()
    key!: string;

    @Field()
    @prop()
    name!: string;

    @Field()
    @prop()
    id!: string;
    
    @Field(() => [ID])
    @arrayProp({ itemsRef: Comments })
    comments?: Ref<Comments>[]; 
    
} 
 export const CollectionModel = new Collection().getModelForClass(Collection);
 
@ObjectType()
export class User extends Typegoose {
    @Field(()=>ID)
    _id!: mongoose.Types.ObjectId;

    @Field()
    @prop({ required:true, minlength: 3})
    name!: string;

    @prop({ required:true, minlength: 6})
    password!: string;
   
    @Field()
    @prop({ required: true, unique:true, lowercase:true})
    email!: string;
   
     @Field(() => [ID])
    @arrayProp({ itemsRef: Collection})
    comments?: Ref<Collection>[]; 
  }
export const UserModel = new User().getModelForClass(User);
  