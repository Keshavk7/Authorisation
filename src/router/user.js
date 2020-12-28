const express = require('express')
const user = require('../model/user')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/user', async (req, res) => {
    const User = new user(req.body)
    try {
        await User.save()
        const token = await User.CreateAuthToken()
        res.status(201).send({ User, token })
    } catch (e) {
        res.status(400).send(e)
    }
})

//Two-Way:

//1st way 
// router.get('/user',auth,async(req,res)=>{
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
// router.get('/user', auth, async (req, res) => {
//     try {
//         if (verifieduser.roleType.toLowerCase() === 'admin') {
//             const User = await user.find({})
//             const dataToSend = [];
//             User.forEach(element => {
//                 if (element.roleType.toLowerCase() === 'user') {
//                     dataToSend.push(element)
//                 }
//             })
//             res.send(dataToSend)
//         }
//         else if (verifieduser.roleType.toLowerCase() === 'user') {
//             res.send(verifieduser)
//         }
//     }
//     catch (e) {
//         res.status(401).send(e)
//     }
// })

//3rd approach because in model we are taking enum.
router.get('/user', auth, async (req, res) => {
    try {
        if (verifieduser.role === 'admin') {
            const User = await user.find({})
            const dataToSend = [];
            User.forEach(element => {
                if (element.role === 'user') {
                    dataToSend.push(element)
                }
            })
            res.send(dataToSend)
        }
        else if (verifieduser.role === 'user') {
            res.send(verifieduser)
        }
    }
    catch (e) {
        res.status(401).send(e)
    }
})
module.exports = router