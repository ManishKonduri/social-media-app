const repo = require('./../DataBase/mongoDBUserData');
const repo1 = require('./../DataBase/mongoDBUserUploadImg');
const util = require('./../DataBase/IdGenerator');

exports.userRegistration = async (req, res) => {
    try {
        let userId = await util.userId();
        const userRegistrationData = {
            userId : userId,
            name: req.body.name,
            password: req.body.pwd,
            email: req.body.email
        }
        const entry = await repo.create(userRegistrationData);
        res.status(201).send("Registration Successfull")
    }
    catch(err) {
        console.log(err)
    }
}


exports.userLogin = async (req, res) => {
    try {
        let email = req.body.email;
        let pwd = req.body.pwd;
        pwd = pwd.toString();
        const user = await repo.find({ email: email, password: pwd });
        console.log(user)
        if(user.length > 0) {
            res.status(201).json({"userId": user[0].userId, "name": user[0].name})
        }
        else {
            res.status(400).json({"message": "Incorrect Email or Password"});
        }
    }
    catch (err) {
        res.status(402).json({"message": "Server Error, try after sometime"})
    }
}

exports.giveImgs = async (req, res) => {
    try {
        const images = await repo1.find({})
        res.status(201).json({"Images": images})
    }
    catch (err) {
        console.log(err)
    }
}

exports.imgLikes = async (req, res) => {
    try {
        let likeList = req.body.likes;
        const likes = await repo1.updateOne({_id: req.body.id}, {
            likes: likeList
        });
        console.log(likes)
        if(likes.ok == 1) {
            
            res.status(201).json({"Likes": likes});
        }
        else {
            res.status(401).json({"Error": "Like failed"})
        }

    }
    catch(err) {
        console.log(err)
    }
}
















// exports.userUploadImg = async (req, res) => {
//     try {
//         console.log(req.body.image)
        
//         const uploadImg = {
//             userId : req.body.userId,
//             image: {
//                 data: req.body.image,
//                 contentType: 'image/png'
//             }
//         }
//         console.log(uploadImg);
//         let data = await repo1.create(uploadImg);
//         console.log(data)
//         if(data) {
//             res.status(201).send("Successfully Uploaded");
//         }
//         else {
//             res.status(400).send("Failed to Upload");
//         }
//     }
//     catch (err) {
//         res.status(402).json({"message": "Server Error, try after sometime"})
//         console.log(err)
//     }
// }