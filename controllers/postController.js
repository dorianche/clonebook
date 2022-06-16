const User = require('../models/user');
const { body, validationResult } = require("express-validator");
const passport = require('passport');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); 
const Post = require('../models/post');
const Comment = require('../models/comment');
const async = require('async'); 



exports.createPost = (req, res, next) => {
    const newPost = new Post({
        text: req.body.text,
        user: req.user._id,
    })
    newPost.save((err) => {
        if (err) { return next(err)}
        res.status(201).json({msg: 'Post sucessfully added'})
    })
} 

exports.getPostDetail = (req, res, next) => {
    Post.findById(req.params.id)
    .exec((err, result) => {
        if (err) {return (next(err))}
        else {res.status(200).json(result)}
    })
} 

exports.getAllPosts = (req, res, next) => {
    Post.find({})
    .populate('user')
    .exec((err, result ) => {
        if (err) {return next (err)} 
        else {
            res.status(200).json(result)
        }
    })
} 

exports.getProfilePosts = (req , res , next ) => {
Post.find({user: req.user._id })
    .populate('user')
    .exec((err, result ) => {
        if (err) {return next (err)} 
        else {
            res.status(200).json(result)
        }
    })
}


exports.deletePost = (req, res, next) => {
    Post.findByIdAndRemove(req.params.id)
    .exec((err) => {
        if (err) {return next(err)}
        res.json({msg: 'Post deleted'})
    })
}  

exports.editPost = (req, res, next) => {
    const updatedPost = new Post({
        text: req.body.text,
        user: req.params.user,
        _id: req.params.id
    })
    Post.findByIdAndUpdate(req.params.id, updatedPost, {}, (err) => {
        if (err) { return next(err) }
        res.json({msg: 'Post updated'})
    })
} 