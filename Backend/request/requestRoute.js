const express = require('express')
const {
    createRequest,
    getAllRequests,
    getRequestById,
    updateRequest,
    deleteRequest
} = require('./requestController')


const router = express.Router()

// GET all requests
router.get('/', getAllRequests)

// GET a single request
router.get('/:id', getRequestById)

// POST a new request
router.post('/', createRequest)

// DELETE a request
router.delete('/:id', deleteRequest)

// UPDATE a request
router.patch('/:id', updateRequest)

module.exports = router