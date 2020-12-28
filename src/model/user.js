const mongoose= require('mongoose')
const validator= require('validator')
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
        required:true,
        type:String,
        trim:true,
    },
    lastName:{
        type:String,
        required:true,
        trim:true
    },
    email:{
         type:String,
         required:true,
         trim:true,
         lowercase:true,
         unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
    
        }
    },  
     address:{
         type:String,
         trim:true,
         required:true
         
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
    //  roleType:{
    //     type:String,
    //     trim:true,
    //     required:true
    // },

    //for 3rd way
     role:{
        type:String,
        enum:['user','admin'],
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
user.createIndexes()
module.exports=user