const mongoose= require('mongoose')
const jwt= require('jsonwebtoken')

const userSchema= new mongoose.Schema({
    age:{
        type:Number,
        required:true,
        validate(value){
            if(value<0 ||value>100){
                throw new Error('Age must be  age of human.')
            }
        }
        },
    firstName:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    lastName:{
        type:String,
        required:true,
        trim:true
    },  
     address:{
         type:String,
         trim:true,
         required:true,
         unique:true
     },

     //For 1st way: --

    //  role:{
    //      Admin:{
    //          type:String
    //      },
    //      User:{
    //          type:String
    //      }
    //  },
    
    //For 2nd way 
     RoleType:{
        type:String,
        trim:true,
        required:true
    },
     
    token:{
             type:String
         }
})

userSchema.methods.CreateAuthToken= async function(){
    const user=this
    const token=jwt.sign({_id:user._id.toString()},process.env.JWT_SECRET)
    user.token=token
    await user.save()
    return token
}

const user= mongoose.model('User',userSchema)
module.exports=user