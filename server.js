
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

const DATA_PATH = path.join(__dirname, 'data.json');

app.use(express.static('public')); // Your HTML lives in /public
app.use(express.json());

app.get('/api/data', (req, res) => {
  if (!fs.existsSync(DATA_PATH)) return res.json([]);
  const data = JSON.parse(fs.readFileSync(DATA_PATH));
  res.json(data);
});

app.post('/api/save', (req, res) => {
  const { title } = req.body;
  let data = [];
  if (fs.existsSync(DATA_PATH)) {
    data = JSON.parse(fs.readFileSync(DATA_PATH));
  }

  // Avoid duplicates
  if (!data.find(item => item.title === title)) {
    data.push({ title });
    fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
  }

  res.json({ success: true });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
