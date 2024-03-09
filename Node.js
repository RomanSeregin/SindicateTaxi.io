const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/api/sendToVK', (req, res) => {
    const { nickname, pickupLocation, destination } = req.body;
    const accessToken = 'your_access_token'; // замените на ваш access token VK API

    const message = `Никнейм: ${nickname}\nМесто, откуда: ${pickupLocation}\nМесто, куда: ${destination}`;
    
    fetch(`https://api.vk.com/method/messages.send?access_token=${accessToken}&user_id=your_user_id&message=${encodeURIComponent(message)}&v=5.131`, {
        method: 'POST'
    })
    .then(response => response.json())
    .then(data => {
        console.log('Response from VK API:', data);
        res.json({ success: true, message: 'Data sent to VK successfully' });
    })
    .catch(error => {
        console.error('Error sending data to VK:', error);
        res.status(500).json({ success: false, message: 'Error sending data to VK' });
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
