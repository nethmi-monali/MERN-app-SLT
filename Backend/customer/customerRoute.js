const express = require('express')
const {
    createCustomer,
    getAllCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer
} = require('./customerController')


const router = express.Router()

// GET all customers
router.get('/', getAllCustomers)

// GET a single customer
router.get('/:id', getCustomerById)

// POST a new customer
router.post('/', createCustomer)

// DELETE a customer
router.delete('/:id', deleteCustomer)

// UPDATE a customer
router.patch('/:id', updateCustomer)

module.exports = router