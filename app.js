const express = require('express');
const cors = require('cors');
const path = require('path');
require('./db/mongoose');
const Users = require('./models/users');
const usersRouter = require('./routers/users');

const app = express();

const port = process.env.PORT || 5000;

const publicPath = path.join(__dirname, 'client/build');

app.use(cors());
app.use(express.json());
app.use(usersRouter);

app.use(express.static(publicPath));

// app.get('/api/users', (req, res) => {
//   try {
//     res.status(200).send('userName:bob');
//   } catch (e) {
//     res.status(400).send('e.message');
//   }
// });

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
