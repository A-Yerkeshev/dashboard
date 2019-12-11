const express = require('express');
const bodyParser = require("body-parser");
const fs = require('fs');
const multer = require('multer');
const app = express();
const upload = multer({dest: '/public/'});

const port = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({
  limit: '100mb',
  extended: true,
  parameterLimit: 100000
}));
app.use(bodyParser.json({limit: '100mb'}));

app.listen(port, () => {
  console.log(`Backend is listening on port ${port}`);
});

// Handle a POST request from Registration component
app.post('/register/new-user', (req, res) => {

  fs.readFile('src/users.json', (err, data) => {
    const json = JSON.parse(data);
    json.push(req.body);

    fs.writeFile('src/users.json', JSON.stringify(json), (err, res) => {
      if (err) {
        console.log('Could not register a user. Error: ' + err);
      }
    })
  })
});

// Handle profile picture upload from Profile component
app.post('/profile/change-pic', upload.single('pic'), (req, res) => {
  const image = __dirname + '/public/' + req.file.filename + '.png';

  fs.rename(req.file.path, image, (err) => {
    if (err) {
      console.log(err);
      res.send(500);
    } else {
      console.log('Image uploaded successfully');
    }
  });

});
