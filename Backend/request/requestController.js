const Request = require('./requestModel');
const mongoose = require('mongoose');

// Create a new request
const createRequest = async (req, res) => {
  const { requestID, customerName, requestDescription, requestStatus} = req.body;

  try {

    // Create the request
    const request = await Request.create({ requestID, customerName, requestDescription, requestStatus });

    res.status(201).json(request);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Get all requests
const getAllRequests = async (req, res) => {
  try {
    const requests = await Request.find({}).sort({ createdAt: -1 })

    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Get a single request by ID
const getRequestById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid request ID' });
  }

  try {
    const request = await Request.findById(id)
    if (!request) {
      return res.status(404).json({ error: 'Request not found' });
    }

    res.status(200).json(request);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Update a request
const updateRequest = async (req, res) => {
    const { id } = req.params;

    try {

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid request ID' });
      }

      const request = await Request.findByIdAndUpdate(id, req.body, { new: true });
      if (!request) {
        return res.status(404).json({ error: 'Request not found' });
      }

      res.status(200).json(request);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Delete a request
const deleteRequest = async (req, res) => {
    const { id } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid request ID' });
        }
        const request = await Request.findByIdAndDelete(id);
        if (!request) {
            return res.status(404).json({ error: 'Request not found' });
        }
        res.status(200).json(request);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    createRequest,
    getAllRequests,
    getRequestById,
    updateRequest,
    deleteRequest
}
