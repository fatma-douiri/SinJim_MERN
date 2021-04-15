const express = require('express')
const router = express.Router()
const {register, login, getUsers,banUser,current,editUser} = require('../controllers/user.controllers')
const {registerRules,validator} = require('../middelwere/validator');
const isAuth = require('../middelwere/passport-setup')
const {isAdmin} = require('../middelwere/isAdmin')


//User registration @ api http://localhost:8080/user/register
router.post('/register', registerRules(),  validator, register)

//User login @ api http://localhost:8080/user/login
router.post('/login',login)

//User auth  @ api http://localhost:8080/user/current
router.get('/current',isAuth(),current)

//Get All Users only from Admin  @ api http://localhost:8080/user/getAllUsers

router.get('/getAllUsers', isAuth(), isAdmin, getUsers);

//Ban User By Id only from Admin @ api http://localhost:8080/user/banUser

router.delete('/banUser',isAuth(), isAdmin, banUser)

//Edit User @ api http://localhost:8080/user/edit/:id
router.put('/edit/:_id',isAuth(), editUser)

module.exports = router;