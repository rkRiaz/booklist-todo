const { validationResult } = require('express-validator')
const {errorFormatter} = require('../utils/errorFormatter')
const { v4: uuidv4 } = require('uuid');
const db = require('../db')

exports.booksByUserId = async (req, res, next) => {
    const { id } = req.params
    const sql = `select * from books where user_id = ${JSON.stringify(id)} order by createTime desc` 
    try {
        db.query(sql, (err, result, fields) => {
            if (err) return res.json({message: err.sqlMessage})
            res.json(result)
        })
    } catch(err) {
        next(err)
    }
}

exports.book = async (req, res, next) => {
    const { id } = req.params
    const sql = `select * from books where book_id = ${JSON.stringify(id)}`
    try {
        db.query(sql, (err, result, fields) => {
            if (err) return res.json({message: err.sqlMessage})
            res.json(result)
        })
    } catch(err) {
        next(err)
    }
}

exports.addBook = async (req, res, next) => {
    // validation of input data --- starts
    let errors = validationResult(req).formatWith(errorFormatter)
    if(!errors.isEmpty()) return res.status(400).json(errors.mapped())
    // validation of input data --- ends

    const {title, author, published_year, book_summary, user_id} = req.body
    let book = {book_id: uuidv4(), title, author, published_year, book_summary, user_id}
    const sql = `insert into books set ?`
    try {
        db.query(sql, book, (err, result, fields) => {
            // err means mysql validation error like if title is null then mysql error will occure as we set title as not null. 
            if (err) return res.json({message: err.sqlMessage})
            res.json({ message: `Successfully added ${title}` })
        })
    } catch(err) {
        next(err)
    }
}

exports.editBook = async (req, res, next) => {
    // validation of input data --- starts
    let errors = validationResult(req).formatWith(errorFormatter)
    if(!errors.isEmpty()) return res.status(400).json(errors.mapped())
    // validation of input data --- ends
    const { id } = req.params
    const {title, author, published_year, book_summary} = req.body

    let sql = `update books set title='${title}', author='${author}', published_year='${published_year}', book_summary='${book_summary}' where book_id = ${JSON.stringify(id)}`
    
    try {
        db.query(sql, (err, result, fields) => {
            console.log(err);
            if (err) return res.json({message: err.sqlMessage})
            res.json({ message: `Edit completed`})
        })
    } catch(err) {
        next(err)
    }
}

exports.deleteBook = async (req, res, next) => {
    const { id } = req.params
    let sql = `delete from books where book_id = ${JSON.stringify(id)}`
    const sql2 = `select * from favbooks where book_id =${JSON.stringify(id)} `
    try {
        db.query(sql2, (err, result, fields) => {
            if (err) return res.json({message: err.sqlMessage})
            if(result.length) {
                const sql3 = `delete from favbooks where book_id =${JSON.stringify(id)}`
                db.query(sql3, (err, result, fields) => {
                    if (err) return res.json({message: err.sqlMessage})
                    db.query(sql, (err, result, fields) => {
                        if (err) return res.json({message: err.sqlMessage})
                        res.json({ message: `Delete completed`})
                    })
                })
            } else {
                db.query(sql, (err, result, fields) => {
                    if (err) return res.json({message: err.sqlMessage})
                    res.json({ message: `Delete completed`})
                })
            }
        })
      
    } catch(err) {
        next(err)
    }
}


exports.favBookToggler = async (req, res, next) => {
    const { user_id, book_id } = req.body
    const sql = `select * from favbooks where user_id = ${JSON.stringify(user_id)} and book_id =${JSON.stringify(book_id)} `
    try {
        db.query(sql, (err, result, fields) => {
            if (err) return res.json({message: err.sqlMessage})
            if(result.length) {
                const sql1 = `delete from favbooks where user_id = ${JSON.stringify(user_id)} and book_id =${JSON.stringify(book_id)}`
                db.query(sql1, (err, result, fields) => {
                    if (err) return res.json({message: err.sqlMessage})
                    res.json({message: "Removed from favourite list"})
                })
            } else {
                const sql2 = `insert into favbooks set ?`
                const favbook = {fav_id: uuidv4(), book_id: book_id, user_id: user_id}
                db.query(sql2, favbook, (err, result, fields) => {
                    if (err) return res.json({message: err.sqlMessage})
                    res.json({message: "Added to favourite list"})
                })
            }
        })
    } catch(err) {
        next(err)
    }
}


exports.favBooksIdByUserId = async (req, res, next) => {
    const { id } = req.params
    const sql = `select book_id from favbooks where user_id = ${JSON.stringify(id)} order by createTime desc`
    try {
        db.query(sql, (err, result, fields) => {
            if (err) return res.json({message: err.sqlMessage})
            res.json(result)
        })
    } catch(err) {
        next(err)
    }
}







