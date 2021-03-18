const { check, validationResult } = require("express-validator");

exports.registerRules=() => [
    check('userName', 'This field is required').notEmpty(),
    check('email', 'This is not a valid email').isEmail(),
    check('password','This is not a valid email').isLength({min:5})
];


exports.validator = async (req,res,next)=>  {
    const errors = validationResult(req);

    errors.isEmpty() ? next() : res.status(402).json({ errors: errors.array() });

};

