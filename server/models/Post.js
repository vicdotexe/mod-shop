const Mongoose = require('mongoose');
const moment = require('moment');

const postSchema = new Mongoose.Schema(
    {
        content:{
            type:String,
            required:true
        },
        title:{
            type:String,
            required:true
        },
        createdAt:{
            type:Date,
            default: Date.now(),
            get: value => {
                return moment(value).local().format("MMM Do YYYY, h:mm:ss a");
            }
        }
    }
);


const Post = Mongoose.model('Post', postSchema)

module.exports = Post;