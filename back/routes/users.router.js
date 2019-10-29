const router = require('express').Router()
const { me, authenticated} = require('../services/authenticate');

const {
  getAllUsers,
  getUserById,
  deleteUserById,
  updateUser
} = require('../controlers/users.controller')

router.get('/', authenticated,   getAllUsers)
router.get('/:id/orders', authenticated,  me,   getUserById)
router.get('/:id', authenticated,  me,   getUserById)
router.delete('/:id',authenticated, me, deleteUserById)
router.put('/:id', authenticated,  me,     updateUser)

module.exports = router
