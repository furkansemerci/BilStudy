require('dotenv').config()
const express = require('express')
const app = express()
const entryRoutes = require('./routes/entries')
const userRoutes = require('./routes/user')
const mongoose = require('mongoose')
const swaggerRoutes = require('./routes/swagger')

app.use(express.json())

/**
 * @swagger
 * tags:
 *   name: Root
 *   description: Base API endpoint
 */


app.use((req,res,next)=>{
    console.log(req.path, req.method)
    next()
})

/**
 * @swagger
 * /:
 *   get:
 *     summary: Welcome message for the API
 *     tags: [Root]
 *     responses:
 *       200:
 *         description: Welcome message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Welcome to the app
 */
app.get('/', (req,res)=>{
    res.json({msg: 'Welcome to the app'})
})

app.use('/api-docs',swaggerRoutes)

app.use('/api/entries', entryRoutes)
app.use('/api/user', userRoutes)

app.use('/uploads', express.static('uploads'))


mongoose.connect(process.env.MONGO_URI).then(() =>{
    app.listen(process.env.PORT, () =>{
        console.log(`Connected to mongodb and listening on port ${process.env.PORT}`)
    })
}).catch((error) =>{
    console.log(error)
})