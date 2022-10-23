const { validationResult } = require('express-validator')
const {errorFormatter} = require('../utils/errorFormatter')
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const db = require('../db')


exports.signup = async (req, res, next) => {
    // validation of input data --- starts
    let errors = validationResult(req).formatWith(errorFormatter)
    if(!errors.isEmpty()) return res.status(400).json(errors.mapped())
    // validation of input data --- ends

    const {name, email, user_password} = req.body
    let user = {user_id: uuidv4(), name, email, user_password}
    const sql = `insert into users set ?`
    // return console.log(user);
    try {
        const sql2 = `select * from users where email="${email}"`
        db.query(sql2, (err, result, fields) => {
            if(result.length) {
                return res.status(400).json({email: "Email is alreay exists! Try with another email"})
            } else {
                db.query(sql, user, (err, result, fields) => {
                    if (err) return res.json(err.sqlMessage)
                    res.json({ message: `Successfully Signup`, data: result })
                })
            }
        })
    } catch(err) {
        next(err)
    }
}

exports.signin = async (req, res, next) => {
    // validation of input data --- starts
    let errors = validationResult(req).formatWith(errorFormatter)
    if(!errors.isEmpty()) return res.status(400).json(errors.mapped())
    // validation of input data --- ends
    const {email, user_password} = req.body
    const sql = `select * from users where email="${email}"`
    try {
            db.query(sql, (err, result, fields) => {
            if (err) return res.json({message: err.sqlMessage})

            let valide = JSON.stringify(result[0]);
            if(valide) {
                let user = JSON.parse(JSON.stringify(result[0]))
                if(user.user_password == user_password) {
                    var token = jwt.sign({ user_id: user.user_id, name: user.name }, process.env.JWT_PRIVATE_KEY);
                    return res.json({message: "Successfully login", token: `Bearer ${token}`})
                } else {
                    return res.status(400).json({user_password: "Invalid Credentials!"})
                }
            } else {
                return res.status(400).json({user_password: "Invalid Credentials!"})
            }
        })
    } catch(err) {
        next(err)
    }
}

exports.user = async (req, res, next) => {
    const { id } = req.params
    const sql = `select * from users where user_id=${JSON.stringify(id)}`
    try {
        db.query(sql, (err, result, fields) => {
            if (err) return res.json({message: err.sqlMessage})
            res.json(result)
        })
    } catch(err) {
        next(err)
    }
}


