const express = require('express');
const cors = require('cors');

const app = express();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/api/users', (req, res) => {
  try {
    res.status(200).send('userName:bob');
  } catch (e) {
    res.status(400).send('e.message');
  }
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
