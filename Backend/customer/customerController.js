const Customer = require('./customerModel');
const mongoose = require('mongoose');

// Create a new customer
const createCustomer = async (req, res) => {
  const { customerID, customerName, customerNIC, customerEmail, customerNumber} = req.body;

  try {

    // Create the customer
    const customer = await Customer.create({ customerID, customerName, customerNIC, customerEmail, customerNumber });

    res.status(201).json(customer);
  } catch (error) {
    console.error('Error creating customer:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Get all customers
const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find({}).sort({ createdAt: -1 })

    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Get a single customer by ID
const getCustomerById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid customer ID' });
  }

  try {
    const customer = await Customer.findById(id)
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Update a customer
const updateCustomer = async (req, res) => {
    const { id } = req.params;

    try {

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid customer ID' });
      }

      const customer = await Customer.findByIdAndUpdate(id, req.body, { new: true });
      if (!customer) {
        return res.status(404).json({ error: 'Customer not found' });
      }

      res.status(200).json(customer);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Delete a customer
const deleteCustomer = async (req, res) => {
    const { id } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid customer ID' });
        }
        const customer = await Customer.findByIdAndDelete(id);
        if (!customer) {
            return res.status(404).json({ error: 'Customer not found' });
        }
        res.status(200).json(customer);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    createCustomer,
    getAllCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer
}
