const express= require('express')
const user= require('../model/user')
const Auth= require('../middleware/auth')
const router= new express.Router()

router.post('/user',async(req,res)=>{
   const User= new user(req.body)
   try{
       await User.save()
       const token= await User.CreateAuthToken()
       res.status(201).send({User,token})
   }catch(e){
       res.status(400).send(e)
   }
})

//Two-Way:

//1st way 
// router.get('/user',Auth,async(req,res)=>{
//     try{
//         if(verifieduser.role.Admin.length!=0){
//             const User= await user.find({})
//             const dataToSend = [];
//             User.forEach(element => {
//                 if (element.role.User.length != 0) {
//                     dataToSend.push(element)
//                 }
//             });
//             res.send(dataToSend)
//           }
//        else if(verifieduser.role.User.length!=0){
//            res.send(verifieduser)
//           }
//       }
//       catch(e){
//       res.status(401).send(e)
//     }
// })

//Below one is 2nd approach
router.get('/user',Auth,async(req,res)=>{
        try{
                if(verifieduser.RoleType.toLowerCase()==='admin'){
                const User= await user.find({})
                const dataToSend = [];
                User.forEach(element=>{
                    if(element.RoleType.toLowerCase()==='user'){
                        dataToSend.push(element)
                    }
                })
                res.send(dataToSend)
            }
            else if(verifieduser.RoleType.toLowerCase()==='user'){
                res.send(verifieduser)
               }
           }
          catch(e){
          res.status(401).send(e)
        }
    })

module.exports=router