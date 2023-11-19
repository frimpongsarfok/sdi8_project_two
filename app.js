const express = require('express');
const fs = require('fs');
const app = express();
const port = 4000;
const cors = require('cors');
const path = require('path');

// Enable CORS for all routes
app.use(cors());
// API endpoint to get JSON data
app.get('/fish', (req, res) => {
  fs.readFile('fish.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading file');
      return;
    }

    try {
      const jsonData = JSON.parse(data);
      res.json(jsonData);
    } catch (err) {
      res.status(500).send('Error parsing JSON');
    }
  });
});
app.get("/image/:imageNum",(req,res)=>{    
    const imageNume=req.params.imageNum;
    fs.readdir('./fish', (err, files) => {
    if (err) {
        console.error('Error reading directory:', err);
        return;
    }
    res.setHeader('Content-Type', 'image/jpeg');
    const imagePath = path.join(__dirname, 'fish', files[imageNume]);
    res.sendFile(imagePath);
    console.log('Files in the directory:', imagePath);
    });

})
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});