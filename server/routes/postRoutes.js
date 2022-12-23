const express = require('express');
const router = express.Router();
const {Post} = require('../models')


router.get('/:id', async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        console.log(post);
        return res.status(200).json(post);
    }catch(err){
        return res.status(500).json(err.message);
    }
})

router.get('/', async(req,res)=>{
    try{
        const posts = await Post.find();
        return res.status(200).json(posts);
    }catch(err){
        return res.status(500).json(err.message);
    }
})

router.post('/', async(req,res)=>{
    try{
        const post = await Post.create(req.body);
        return res.status(201).json(post);
    }catch(err){
        console.log(err.message);
        return res.status(500).json(err.message);
    }
})

router.put('/:id', async(req,res)=>{
    try{
        const post = await Post.findByIdAndUpdate(req.params.id, req.body)
        return res.status(201).json(post);
    }catch(err){
        console.log(err.message);
        return res.status(500).json(err.message);
    }
})

module.exports = router;