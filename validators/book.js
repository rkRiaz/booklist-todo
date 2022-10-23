const { body } = require('express-validator')

exports.addBookValidator = [
        body('title')
        .not().isEmpty().withMessage('Title is required'),

        body('author')
        .not().isEmpty().withMessage('Author name is required'),

        body('published_year')
        .not().isEmpty().withMessage('Published year is required')
        .isNumeric().withMessage('Please provide a valide year'),

        body('book_summary')
        .isLength({ max: 16777215 }).withMessage('Max value: 16777215 character')
]

