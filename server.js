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
}))
app.use(bodyParser.json({limit: '100mb'}));

app.listen(port, () => {
  console.log(`Backend is listening on port ${port}`);
})

// Handle new user registration
app.post('/register/new-user', (req, res) => {

  fs.readFile('src/users.json', (err, data) => {
    const users = JSON.parse(data);

    users.push(req.body);

    fs.writeFile('src/users.json', JSON.stringify(users), (err) => {
      if (err) {
        console.log('Could not register a user. Error: ' + err);
        res.send(500);
      } else {
        console.log('New user num ' + req.body.id + ' successfully registered');
        res.send(200);
      }
    })
  })
})

// Handle profile picture upload from Profile component
app.post('/profile/change-picture', upload.single('pic'), (req, res) => {
  const image = __dirname + '/public/' + req.file.filename + '.png';
  const userId = req.body.userId;

  fs.rename(req.file.path, image, (err) => {
    if (err) {
      console.log('Could not upload the image. Error: ' + err);
      res.send(500);
    } else {
      // Set uploaded picture as active for user
      fs.readFile('src/users.json', (err, data) => {
        const users = JSON.parse(data);

        for (let i=0; i<(users.length); i++) {
          if (users[i].id == userId) {
            users[i].picture = req.file.filename + '.png';
            break;
          }
        }

        fs.writeFile('src/users.json', JSON.stringify(users), (err) => {
          if (err) {
            console.log('Could not change user picture. Error: ' + err);
            res.send(500)
          } else {
            console.log('User ' + userId + ' profile picture successfully changed to' + req.file.filename + '.png');
          }
        })
      })

      console.log('Image uploaded successfully to ' + image);
      res.send(200);
    }
  })
})

// Handle user's headline change from Profile component
app.post('/profile/change-headline', (req, res) => {
  console.log(req.body.headline)
})
