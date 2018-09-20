var express = require('express');
var cors = require('cors')
var User = require('../models/user');
var router = express.Router();
var Post = require('../models/post');
var jwt = require('jsonwebtoken')

// let jwtVerify =  function(next)   {
//     jwt.verify(req.query.token , ".`3m`wyf5;qJDe/^&aX})/,Ab(ykH}sFvr5W{\h-HyPZC~8g" , (err , decoded) => {
//     if(err) {
//     return res.status(401).json({
//         title : 'not uthenticated',
//         error : err
//             })
//         }
//     })
// }


router.get('/get-posts-all' , (req , res , next) => {
    Post.find()
    .populate('user' , 'username')
    .exec((err , result) => {
        if(err) {
            return res.status(500).json({
                title : 'there is an error bud',
                error : err 
            })
        }
        res.status(201).json({
            message : 'success',
            obj : result
        });
    })
})



// router.use('/' , (req , res , next) => {
//     jwt.verify(req.query.token , ".`3m`wyf5;qJDe/^&aX})/,Ab(ykH}sFvr5W{\h-HyPZC~8g" , (err , decoded) => {
//         if(err) {
//         return res.status(401).json({
//             title : 'not uthenticated',
//             error : err
//             })
//         }
//         next();
//     })
// })


router.post('/' , (req , res , next) => {
    jwt.verify(req.query.token , ".`3m`wyf5;qJDe/^&aX})/,Ab(ykH}sFvr5W{\h-HyPZC~8g" , (err , decoded) => {
        if(err) {
        return res.status(401).json({
            title : 'not authenticated',
            error : err
            })
        }
    })

    let decoded = jwt.decode(req.query.token)

    User.findById(decoded.user._id , (err , user) =>  {
        if(err) {
            return res.status(500).json({
                title : 'there is an  error bud',
                error : err 
            })
        }

        var post = new Post({
            authorName : req.body.authorName ,
            content : req.body.content ,
            date : req.body.date ,
            user : user._id
        });
        post.save((err , result) => {
            if(err) {
                return res.status(500).json({
                    title : 'there is an  error bud',
                    error : err 
                })
            }
            user.posts.push(result._id)
            user.save();

            res.status(201).json({
                message : 'saved message',
                obj : result
            })
        
    })

    })
});


router.get('/' , (req , res , next) => {
    next();
})


router.put('/:id' , (req , res , next) => {
    jwt.verify(req.query.token , ".`3m`wyf5;qJDe/^&aX})/,Ab(ykH}sFvr5W{\h-HyPZC~8g" , (err , decoded) => {
        if(err) {
        return res.status(401).json({
            title : 'not authenticated',
            error : err
            })
        }
    })
    
    let decoded = jwt.decode(req.query.token)


    let id = req.params.id ;
    Post.findById(id , (err , post) => {
        if(err) {
            return res.status(500).json({
                title : 'there is an  error bud',
                error : err
            })
        }
        if(post.user != decoded.user._id) {
            return res.status(401).json({
                title : "not authenticated",
                error : {message : "not authenticated"}
            })
        }
        post.content = req.body.content
        post.save();

        res.status(201).json({
            title : 'found and updated',
            obj : post
        })
})

})


router.delete('/:id' ,cors() , (req , res , next) => {

    jwt.verify(req.query.token , ".`3m`wyf5;qJDe/^&aX})/,Ab(ykH}sFvr5W{\h-HyPZC~8g" , (err , decoded) => {
        if(err) {
        return res.status(401).json({
            title : 'not authenticated',
            error : err
            })
        }
    })


    let decoded = jwt.decode(req.query.token)


    let id = req.params.id ;

    Post.findById(id , (err , post) => {
        if(err) {
            return res.status(500).json({
                title : 'there is an error bud',
                error : err
            })
        }
        if(post.user != decoded.user._id) {
            return res.status(401).json({
                title : "not authenticated",
                error : {message : "not authenticated"}
            })
        }
        post.remove();
        res.status(201).json({
            title : 'successfully deleted',
            obj : post
        })
    })
})



// router.get('/getuser' , (req , res , next) => {
//     jwt.verify(req.query.token , ".`3m`wyf5;qJDe/^&aX})/,Ab(ykH}sFvr5W{\h-HyPZC~8g" , (err , decoded) => {
//         if(err) {
//         return res.status(401).json({
//             title : 'not uthenticated',
//             error : err
//             })
//         }
//     })
//     let decoded = jwt.decode(req.query.token)
//     User.findById(decoded.user._id , (err , user) => {
//         if(err) {
//             return res.status(500).json({
//                 title : 'there is an POST error bud',
//                 error : err 
//             })
//         }
//         res.status(201).json({
//             title : 'got username',
//             username : user.username
//         })
//     })



// })

module.exports = router 