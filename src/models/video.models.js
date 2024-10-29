import mongoose ,{Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const videoSchema=new Schema(
    {
     videoFile:{
        type:String,//cloudinary url
        required:true
     },
     thumbnail:{
        type:String,//cloudinary url
        required:true
     },
    title:{
        type:String,
        required:true
     },
     description:{
        type:String,
        requried:true
     },
     duration:{
        type:Number,//clodinary url :We get the time and other info also by the cloudinary
        required:true
     },
     views:{
        type:Number,
        default:0
     },
     isPublished:{
        type:Boolean,
        default:true
     },
     owner:{
        type:Schema.Type
     }
    },
    {
        timestamps:true
    }
)

videoSchema.plugin(mongooseAggregatePaginate)
export const Video=mongoose.model("Video",videoSchema)