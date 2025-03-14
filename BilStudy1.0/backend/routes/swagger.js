const swaggerJSDoc = require('swagger-jsdoc')
const swaggerui = require('swagger-ui-express')
const express = require('express')
const router = express.Router()



const options ={
    definition:{
        openapi : '3.0.0',
        info : {
            title: 'BilStudy API Project',
            version: '1.0.0'
        },
        servers: [{
            url: 'http://localhost:4000/'
        }]
    },
    apis: ['./controllers/*.js', './routes/*.js']
}

const swaggerSpec = swaggerJSDoc(options)
router.use('/', swaggerui.serve, swaggerui.setup(swaggerSpec))


/**
 * @swagger
 * /:
 *  get:
 *      summary: This api is used to check if get method is working or not
 *      description: This api is used to check if get method is working or not
 *      responses:
 *          200:
 *              description: To test get method
 */

router.get('/', (req, res) => {
    res.json({ msg: 'Welcome to the API documentation' });
});

module.exports = router

