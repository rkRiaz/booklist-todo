
const { check } = require('express-validator')
const db = require('../db')

exports.userSignupValidator = [
    check('name')
    .not().isEmpty().withMessage('Name is required'),

    check('email')
    .not().isEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valide email')
    .trim(),
    
    check('user_password')
    .not().isEmpty().withMessage('Please Enter Your Password')
    .isLength({ min: 6 }).withMessage('Must be at least 6 chars long')
    .matches(/\d/).withMessage('must contain a number'),

    check('confirm_password')
    .not().isEmpty().withMessage('Please Enter Your Confirm Password')
    .custom((confirm_password, {req}) => {
        if(confirm_password !== req.body.user_password) {
            throw new Error('Confirm password does not match with password')
        }
        return true
    }),
]

exports.userSigninValidator = [
    check('email')
    .not().isEmpty().withMessage('Please enter your email')
    .isEmail().withMessage('Please provide a valide email')
    .trim(),
    
    check('user_password')
    .not().isEmpty().withMessage('Please Enter Your Password')
]


