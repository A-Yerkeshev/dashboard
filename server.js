const express = require('express');
const bodyParser = require("body-parser");
const fs = require('fs');
const app = express();

const port = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Backend is listening on port ${port}`);
});

// Handle a POST request from Registration component
app.post('/register', (req, res) => {

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
