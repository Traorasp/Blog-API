const Post = require('../models/post');

const {body, validationResult} = require('express-validator');

exports.post_list_get = (req, res) => {
    Post.find({"published" : "true"})
        .exec(function(err, posts) {
            if(posts == null) {
                return res.json({msg: 'Posts not found'});
            }
            if(err) {return next(err);}
            res.json({posts});
        }, [])
};

exports.post_list_get_all = (req, res) => {
    Post.find()
        .exec(function(err, posts) {
            if(posts == null) {
                return res.json({msg: 'Posts not found'});
            }
            if(err) {return next(err);}
            res.json({posts});
        }, [])
};

exports.post_detail_get = (req, res) => {
    Post.findById(req.params.id)
        .exec(function(err, post) {
            if(post == null) {
                return res.json({msg: 'Post not found'});
            }
            if(err) {return next(err);}
            res.json({post});
    })
};

exports.post_create_post = [
    body('title', "Post must have title")
        .trim()
        .isLength({min: 1})
        .escape(),
    body('content', "Post must have content")
        .trim()
        .isLength({min: 1})
        .escape(),
    (req, res, next) => {

        if(!req.user) {
            res.json({msg: 'Not logged in'})
        }

        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            res.json({
                data: req.body,
                errors: errors.array(),
            });
            return;
        }
        const post = new Post({
            title: req.body.title,
            date: Date.now(),
            content: req.body.content,
            published: req.body.published, 
        });

        post.save((err) => {
            if(err) {
                return next(err);
            }
            res.json({msg: 'Post sent'});
        });
    },
];

exports.post_update_post = [
    body('title', "Post must have title")
        .trim()
        .isLength({min: 1})
        .escape(),
    body('content', "Post must have content")
        .trim()
        .isLength({min: 1})
        .escape(),
    (req, res, next) => {

        if(!req.user) {
            res.json({msg: 'Not logged in'})
        }

        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            res.json({
                data: req.body,
                errors: errors.array(),
            });
            return;
        }
        const post = new Post({
            _id: req.params.id,
            title: req.body.title,
            date: Date.now(),
            content: req.body.content,
            published: req.body.published, 
        });

        Post.findByIdAndUpdate(req.params.id, post, {}, (err) => {
            if(err) {
                return next(err);
            }
            res.json({msg: 'Post updated'});   
        });
    },
];

exports.post_delete_post = (req, res) => {

    if(!req.user) {
        res.json({msg: 'Not logged in'})
    }

    Post.findByIdAndDelete(req.params.id, (err) => {
        if(err) {
            return next(err);
        }
        res.json({msg: 'Post deleted'});
    })
};