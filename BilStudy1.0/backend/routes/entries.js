const express = require('express')
const router = express.Router()
const {
    createEntry,
    getEntries,
    getEntry,
    deleteEntry,
    updateEntry
} = require('../controllers/entryController')
const upload = require('../middleware/upload')


/**
 * @swagger
 * tags:
 *   name: Entries
 *   description: API for managing entries
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Entry:
 *       type: object
 *       required:
 *         - title
 *         - description
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated ID of the entry
 *         title:
 *           type: string
 *           description: Title of the entry
 *         description:
 *           type: string
 *           description: Description of the entry
 *         userId:
 *           type: string
 *           description: ID of the user who created the entry
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp of when the entry was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp of when the entry was last updated
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
const requireAuth = require('../middleware/requireAuth')

router.use(requireAuth)
/**
 * @swagger
 * /api/entries:
 *   get:
 *     summary: Get all entries for the authenticated user
 *     tags: [Entries]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all entries
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Entry'
 *       401:
 *         description: Unauthorized, authentication required
 *       500:
 *         description: Server error
 */
router.get('/',getEntries)

/**
 * @swagger
 * /api/entries/{id}:
 *   get:
 *     summary: Get a specific entry by ID
 *     tags: [Entries]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the entry to retrieve
 *     responses:
 *       200:
 *         description: Entry found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Entry'
 *       401:
 *         description: Unauthorized, authentication required
 *       404:
 *         description: Entry not found
 *       500:
 *         description: Server error
 */
router.get('/:id', getEntry)

/**
 * @swagger
 * /api/entries:
 *   post:
 *     summary: Create a new entry
 *     tags: [Entries]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - text
 *             properties:
 *               title:
 *                 type: string
 *               text:
 *                 type: string
 *     responses:
 *       201:
 *         description: Entry created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Entry'
 *       400:
 *         description: Invalid request data
 *       401:
 *         description: Unauthorized, authentication required
 *       500:
 *         description: Server error
 */
router.post('/', upload.single('avatar'),createEntry)


/**
 * @swagger
 * /api/entries/{id}:
 *   delete:
 *     summary: Delete an entry
 *     tags: [Entries]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the entry to delete
 *     responses:
 *       200:
 *         description: Entry deleted successfully
 *       401:
 *         description: Unauthorized, authentication required
 *       404:
 *         description: Entry not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', deleteEntry)


/**
 * @swagger
 * /api/entries/{id}:
 *   patch:
 *     summary: Update an entry
 *     tags: [Entries]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the entry to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Entry updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Entry'
 *       400:
 *         description: Invalid request data
 *       401:
 *         description: Unauthorized, authentication required
 *       404:
 *         description: Entry not found
 *       500:
 *         description: Server error
 */
router.patch('/:id', updateEntry)

module.exports = router