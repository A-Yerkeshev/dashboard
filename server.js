// Express, Multer
const express = require('express');
const bodyParser = require("body-parser");
const fs = require('fs');
const multer = require('multer');
const path = require('path');

// JSON server
const jsonServer = require('json-server');
const jsonRouter = jsonServer.router(path.join(__dirname, 'db.json'));

const app = express();
const upload = multer({dest: path.join(__dirname, 'build')});
const port = process.env.PORT || 3000;

// Define endpoint for json-server
app.use('/api', jsonRouter);

app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


/* --- Backend implementation with Node native modules --- */

// app.use(bodyParser.urlencoded({
//   limit: '100mb',
//   extended: true,
//   parameterLimit: 100000
// }))
// app.use(bodyParser.json({limit: '100mb'}));

// Handle new user registration
// app.post('/register/new-user', (req, res) => {

//   fs.readFile('src/db.json', (err, data) => {
//     const users = JSON.parse(data).users;

//     users.push(req.body);

//     fs.writeFile('src/db.json', JSON.stringify(users), (err) => {
//       if (err) {
//         console.log('Could not register a user. Error: ' + err);
//         res.send(500);
//       } else {
//         console.log('New user num ' + req.body.id + ' successfully registered');
//         res.send(200);
//       }
//     })
//   })
// })

// // Handle profile picture upload from Profile component
// app.post('/profile/change-picture', upload.single('pic'), (req, res) => {
//   const image = __dirname + req.file.filename + '.png';
//   const userId = req.body.userId;

//   fs.rename(req.file.path, image, (err) => {
//     if (err) {
//       console.log('Could not upload the image. Error: ' + err);
//       res.send(500);
//     } else {
//       // Set uploaded picture as active for user
//       fs.readFile('src/db.json', (err, data) => {
//         const users = JSON.parse(data).users;

//         for (let i=0; i<(users.length); i++) {
//           if (users[i].id == userId) {
//             users[i].picture = req.file.filename + '.png';
//             break;
//           }
//         }

//         fs.writeFile('src/db.json', JSON.stringify(users), (err) => {
//           if (err) {
//             console.log('Could not change user picture. Error: ' + err);
//             res.send(500);
//           } else {
//             console.log('Image uploaded successfully to ' + image);
//             res.send(200);
//           }
//         })
//       })
//     }
//   })
// });

// // Handle user's headline change from Profile component
// app.post('/profile/change-headline', (req, res) => {
//   const headline = req.body.headline;
//   const userId = req.body.userId;

//   fs.readFile('src/db.json', (err, data) => {
//     const users = JSON.parse(data).users;

//     for (let i=0; i<(users.length); i++) {
//       if (users[i].id == userId) {
//         users[i].headline = headline;
//         break;
//       }
//     }

//     fs.writeFile('src/db.json', JSON.stringify(users), (err) => {
//       if (err) {
//         console.log('Could not change user headline. Error: ' + err);
//         res.send(500);
//       } else {
//         console.log('User ' + userId + ' headline successfully changed to ' + headline);
//         res.send(200);
//       }
//     })
//   })
// })

// // Add new post
// app.post('/posts/new-post', (req, res) => {

//   fs.readFile('src/db.json', (err, data) => {
//     const posts = JSON.parse(data).posts;

//     posts.push(req.body);

//     fs.writeFile('src/db.json', JSON.stringify(posts), (err) => {
//       if (err) {
//         console.log('Could not add new post. Error: ' + err);
//         res.send(500);
//       } else {
//         console.log('New post num ' + req.body.id + ' successfully added');
//         res.send(200);
//       }
//     })
//   })
// })

// // Edit existing post
// app.post('/posts/edit-post', (req, res) => {
//   const id = req.body.id;

//   fs.readFile('src/db.json', (err, data) => {
//     const posts = JSON.parse(data).posts;

//     const post = posts.find((p) => {
//       return p.id === id;
//     })

//     post.title = req.body.title;
//     post.body = req.body.body;

//     fs.writeFile('src/db.json', JSON.stringify(posts), (err) => {
//       if (err) {
//         console.log('Could not edit post. Error: ' + err);
//         res.send(500);
//       } else {
//         console.log('Post num ' + req.body.id + ' successfully edited');
//         res.send(200);
//       }
//     })
//   })
// })

// // Delete post
// app.post('/posts/delete-post', (req, res) => {
//   const id = req.body.id;

//   fs.readFile('src/db.json', (err, data) => {
//     const posts = JSON.parse(data).posts;

//     for (i=0; i<=(posts.length); i++) {
//       if (posts[i].id === id) {

//         posts.splice(i, 1);

//         // Write changes
//         fs.writeFile('src/db.json', JSON.stringify(posts), (err) => {
//           if (err) {
//             console.log('Could not delete post. Error: ' + err);
//             res.send(500);
//           } else {
//             console.log('Post num ' + req.body.id + ' successfully deleted');
//             res.send(200);
//           }
//         })
//         return;
//       }
//     }
//   })
// })


if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'build')));

  // Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
}

app.listen(port, () => {
  console.log(`Backend is listening on port ${port}`);
})
