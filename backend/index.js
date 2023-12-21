const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3001;

// Enable CORS to allow cross-origin requests
app.use(cors());
// Parse incoming JSON requests
app.use(bodyParser.json());

// Prices for different services and grades
const serviceGradePrices = {
  "Academic writing": {
    "High school": 12,
    "Undergraduate": 15,
    "Bachelor": 21,
    "Professionals": 25,
  },
  "Editing and proofreading": {
    "High school": 3,
    "Undergraduate": 5,
    "Bachelor": 7,
    "Professionals": 13,
  },
  "Calculations": {
    "High school": 18,
    "Undergraduate": 23,
    "Bachelor": 32,
    "Professionals": 38,
  },
};

// Handle POST requests to /calculatePrice endpoint
app.post('/calculatePrice', (req, res) => {
  // Extract service, grade, and quantity from the request body
  const { service, grade, quantity } = req.body;
  // Calculate the price based on the service, grade, and quantity
  const price = serviceGradePrices[service][grade] * quantity;

  // Send the calculated price as a JSON response
  res.json({ price });
});

// Start the server on the specified port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
