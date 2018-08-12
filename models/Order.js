const mongoose=require('mongoose')
const Schema=mongoose.Schema

const oderSchema=new Schema({
 date :{
 	type:Date,
 	default:Date.now
 },
 order:{
 	type:Number,
 	required:true
 },
 list:[
 	{
 		name:{
 			type:String
 		},
 		quantity:{
 			type: Number
 		},
 		cost:{
 			type:Number
 		}
 	}
 ],
 users:{
   	ref:'users',
   	type: Schema.Types.ObjectId
   }
})