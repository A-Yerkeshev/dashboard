const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`Backend is listening on port ${port}`));

// Handle a POST request from Registration component
app.get('/server', (req, res) => {
  res.send({express: 'You acessed server-side of this app'});
})

app.post('/server', (req, res) => {
  console.log(req)
  const id = req.body.id;
  const username = req.body.username;
  const password = req.body.password;

  console.log('Username: ' + username);
  console.log('Username: ' + username);

  res.end('New user successfully registered');
});
