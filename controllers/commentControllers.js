const Comment = require('../models/comment');

const {body, validationResult} = require('express-validator');

exports.comment_list_get = (req, res) => {
    Comment.find({"post" : req.params.id})
        .exec(function(err, comments) {
            if(comments == null) {
                return res.json({msg: 'Comments not found'});
            }
            if(err) {return next(err);}
            res.json({posts});
        }, [])
};

exports.comment_create_post = [
    body('comment', 'Comment is empty')
        .trim()
        .isLength({min: 1})
        .escape(),
    (req, res, next) => {
        errors = validationResult(req);

        if(!errors.isEmpty()) {
            res.json({
                data: req.body,
                errors: errors.array(),
            });
            return;
        }

        const comment = new Comment({
            comment: req.body.comment,
            date: Date.now(),
            post: req.params.id,
        });

        comment.save((err) => {
            if(err) {
                return next(err);
            }
            res.json({msg: 'Comment saved'});
        });
    },
];
