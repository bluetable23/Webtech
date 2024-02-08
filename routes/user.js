const express = require('express');
const { body } = require('express-validator');

const router = express.Router();


const userController = require('../controllers/user');




///alleUser
router.get('/', userController.getUsers);

///UserbyID
router.get('/:usernamea', userController.getUser);
//lösch User
router.delete('/:usernamea', userController.deleteUser);

//User registrieren
router.post('/register', [
    body('usernamea').trim().isLength({min: 2}),
    body('passworda').trim().isLength({min: 2}),
    body('emaila').trim().isLength({min: 2}),
    body('rolea').trim().isLength({min: 2}),
], userController.createUser);

// User einloggen
router.post('/login',userController.loginUser);


router.put('/ida',userController.updateUser);


module.exports = router;

