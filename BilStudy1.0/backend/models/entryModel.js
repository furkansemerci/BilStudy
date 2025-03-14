const mongoose = require('mongoose')

const Schema = mongoose.Schema

const entrySchema = new Schema({
    title:{
        type: String,
        required : true
    },
    text:{
        type:String,
        required: true
    },
    user_id:{
        type:String,
        required: true
    },
    username:{
        type:String
    },
    avatar:{
        type: String
    }
},{ timestamps: true})

module.exports = mongoose.model('Entry', entrySchema)