const express = require('express');
const fs = require('fs');
const app = express();
const port = 4000;
const cors = require('cors');
const path = require('path');

// Enable CORS for all routes
app.use(cors({}));

const corsOptions = {
  origin: 'https://progress0001.d38e4w01r6499i.amplifyapp.com/', // Define the allowed origin
  optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
};
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
    fs.readFile('fish.json', 'utf8', (err, data) => {
        if (err) {
          res.status(500).send('Error reading file');
          return;
        }
    
        try {
          const jsonData = JSON.parse(data);
          const fishName=jsonData[imageNume]["file-name"];
          console.log('Files in the directory:', fishName);

          res.setHeader('Content-Type', 'image/jpeg');
          const imagePath = path.join(__dirname, 'fish', fishName+".png");
          res.sendFile(imagePath);
          console.log('Files in the directory:', imagePath);
        } catch (err) {
          res.status(500).send('Error parsing JSON:'+err);
        }
      });

})

app.listen(process.env.PORT ||port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
