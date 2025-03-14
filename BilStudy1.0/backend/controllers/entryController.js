const Entry = require('../models/entryModel')
const mongoose = require('mongoose')

const getEntries = async (req,res) => {
    const user_id = req.user._id
    const entries = await Entry.find().sort({createdAt: -1})

    res.status(200).json(entries)
}


const getEntry = async(req,res) => {
    const { id } = req.params 
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No Such Entry'})
    }

    const entry = await Entry.findById(id)

    if(!entry){
        return res.status(404).json({error: 'No such entry'})
    }

    res.status(200).json(entry)

}


const createEntry = async (req,res) => {

    const {title, text} = req.body
    let emptyFields = []

    if(!title){
        emptyFields.push('title')
    }

    if(!text){
        emptyFields.push('text')
    }


    if(emptyFields.length>0){
        return res.status(400).json({error: 'Please fill in all the fields', emptyFields})
    }

    let entry = new Entry({
        title,
        text,
        user_id: req.user._id,
        username: req.username,

    })

    if(req.file){
        entry.avatar = req.file.path
    }

    try{
        //const user_id = req.user._id
        //const username = req.username
        //const avatar = req.avatar
        const entryres = await entry.save()
        
        res.status(200).json(entryres)

    }catch(error){
        res.status(400).json({error: error.message})
    }


}


const deleteEntry = async (req,res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({error : 'No such entry'})
    }

    const entry = await Entry.findOneAndDelete({_id: id})

    if(!entry){
        return res.status(400).json({error: 'No such entry'})
    }

    res.status(200).json(entry)
}

const updateEntry = async(req,res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such entry'})
    }

    const entry = await Entry.findOneAndUpdate({_id:id},{ ...req.body}) 

    if(!entry){
        return res.status(400).json({error: 'No such entry'})
    }
    res.status(200).json(entry)

}


module.exports = {
    createEntry,
    getEntry,
    getEntries,
    deleteEntry,
    updateEntry
}