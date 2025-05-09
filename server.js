const axios = require('axios');
const dns = require('dns');
const url = require('url');
const express = require('express');
const app = express();
app.use(express.json());

aapp.post('/send-data', async (req, res) => {
    try {
      const apiUrl = 'https://uat.nandishatech.com/WS/v1/Payout/Action/addBeneficiary';
      const parsedUrl = url.parse(apiUrl);
  
      // Resolve domain to IP address
      dns.lookup(parsedUrl.hostname, async (err, address, family) => {
        if (err) {
          console.error('DNS lookup failed:', err.message);
          return res.status(500).send({ error: 'DNS resolution failed', details: err.message });
        }
  
        // Log the resolved IP address of the domain
        console.log(`Resolved IP for ${parsedUrl.hostname}: ${address}`);
  
        const payload = {
          username: "6803f64749954e38ecbd546bed172a0b",
          password: "ac4708f0fb5072cdb3498d2b0e904e4f",
          requestid: "gLcirmfYKZB6y0HfTnJMss",
          beneficiary_name: "Test API Bene",
          beneficiary_type: "UPI",
          vpa: "8750400903@airtel"
        };
  
        try {
          const response = await axios.post(apiUrl, payload, {
            headers: {
              'Content-Type': 'application/json'
            }
          });
  
          // Send the response data to the client
          res.send(response.data);
        } catch (error) {
          console.error('API request failed:', error.message);
          if (error.response) {
            console.error('Response data:', error.response.data);
            console.error('Status:', error.response.status);
            console.error('Headers:', error.response.headers);
          }
          res.status(500).send({ error: 'Failed to send data', details: error.message });
        }
      });
    } catch (error) {
      console.error('Unexpected error:', error.message);
      res.status(500).send({ error: 'Unexpected failure', details: error.message });
    }
  });

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
