const express = require('express')
const { CreateUser, GetUser, UpdateUser, DeleteUser , loginUser  } = require('../controllers/user')
const saveProductRoutes = require('./saveProductRoutes')
const router = express.Router()


router.route('/').post(CreateUser)
router.route('/login').post(loginUser)
router.use('/:userId/save' , saveProductRoutes)
router.route('/:id').get(GetUser).patch(UpdateUser).delete(DeleteUser)

module.exports = router