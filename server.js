const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

app.post('/send-data', async (req, res) => {
    try {
      const payload = {
        username: "6803f64749954e38ecbd546bed172a0b",
        password: "ac4708f0fb5072cdb3498d2b0e904e4f",
        requestid: "gLcirmfYKZB6y0HfTnJMss",
        beneficiary_name: "Test API Bene",
        beneficiary_type: "UPI",
        vpa: "8750400903@airtel"
      };
  
      const response = await axios.post('http://localhost/vyompay-uat/WS/v1/Payout/Action/addBeneficiary', payload, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      console.log('API response:', response.data); // ✅ log external API response
      res.send(response.data);
    } catch (error) {
      console.error('API request failed:', error.message); // ✅ log the error message
      if (error.response) {
        console.error('Response data:', error.response.data); // More details from API
        console.error('Status:', error.response.status);
        console.error('Headers:', error.response.headers);
      }
      res.status(500).send({ error: 'Failed to send data', details: error.message });
    }
  });
  

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
