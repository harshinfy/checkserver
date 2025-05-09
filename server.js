const axios = require('axios');
const dns = require('dns');
const url = require('url');
const os = require('os');
const express = require('express');
const app = express();

// Function to get public IP of the server (outgoing request IP)
async function getPublicIp() {
  try {
    const response = await axios.get('https://checkserver-8waz.onrender.com/');
    return response.data.ip; // Return the public IP
  } catch (error) {
    console.error('Error fetching public IP address:', error.message);
    return 'Error fetching IP';
  }
}

app.post('/send-data', async (req, res) => {
  try {
    const apiUrl = 'https://uat.nandishatech.com/WS/v1/Payout/Action/addBeneficiary';
    const parsedUrl = url.parse(apiUrl);

    // Step 1: Fetch public IP of the server that is making the request
    const serverIp = await getPublicIp();
    console.log(`Server's Public IP Address: ${serverIp}`);

    // Step 2: Resolve the domain (apiUrl) to IP address
    dns.lookup(parsedUrl.hostname, async (err, address, family) => {
      if (err) {
        console.error('DNS lookup failed:', err.message);
        return res.status(500).send({ error: 'DNS resolution failed', details: err.message });
      }

      // Log the resolved IP address of the external API domain
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
        // Step 3: Send the request to the external API
        const response = await axios.post(apiUrl, payload, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        // Send the response data back to the client
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

// Start the Express server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
