const express = require('express')
const router = express.Router()
const {register, login, getUsers,banUser} = require('../controllers/user.controllers')
const {registerRules,validator} = require('../middelwere/validator');
const isAuth = require('../middelwere/passport-setup')


//User registration @ api http://localhost:8080/user/register
router.post('/register', registerRules(),  validator, register)

//User login @ api http://localhost:8080/user/login
router.post('/login',login)

//User auth  @ api http://localhost:8080/user/current
router.get('/current',isAuth(),(req,res)=>{
  
    res.json(req.user);
  })

//Get Users only from Admin  @ api http://localhost:8080/user/list-all-users
router.get('/list-all-users', getUsers);

//Ban User  only from Admin @ api http://localhost:8080/user/ban-user
router.delete('/:_id',banUser)





  



module.exports = router;