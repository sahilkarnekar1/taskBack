// backend/server.js

const express = require('express');
const connectDB = require('./db');
const auth= require("./routes/auth")
const task= require("./routes/task")
const cors = require("cors")

// Initialize Express app
const app = express();
app.get('/', (req, res) => {
  res.send('Hello, World!');
});
app.use(express.json());
app.use(cors())
// Connect to MongoDB
connectDB();

// Other server setup and routes
app.use('/api/user', auth);
app.use('/api/user', task);


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
