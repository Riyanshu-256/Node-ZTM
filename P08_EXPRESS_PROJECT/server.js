// Import express library (require karke Express framework load kiya)
const express = require('express');

// Express app ka object create kiya (server banane ke liye use hoga)
const app = express();

// Port number jisme server chalega
const PORT = 3000;

// Route 1: Root URL ('/')
// Jab user http://localhost:3000/ open karega
// Tab JSON data return hoga (id aur name)
app.get('/', (req, res) => {
    res.send({
        id: 1,
        name: 'Sir Isaac Newton'
    });
});

// Route 2: '/messages'
// Jab user http://localhost:3000/messages open karega
// Tab ek simple HTML list return hogi
app.get('/messages', (req, res) => {
    res.send('<ul><li>Hello Albert!</li></ul>');
});

// Server ko start karna
// Server port 3000 par chalega aur console me message print karega
app.listen(PORT, () => {
    console.log(`Listening on ${PORT}...`);
});
