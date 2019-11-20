const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`Backend is listening on port ${port}`));

// Handle a POST request from Registration component
app.post('/register', (req, res) => {

  const id = req.body.id;
  const username = req.body.username;
  const password = req.body.password;

  console.log('Username: ' + username);
  console.log('Username: ' + username);

  res.end('New user successfully registered');
});
