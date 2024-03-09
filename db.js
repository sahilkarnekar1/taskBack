// backend/db.js

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // MongoDB connection string
    const connectionString = 'mongodb+srv://tt1:1reAbUnozOtIC74o@cluster0.pyhi6xj.mongodb.net/mydb';

    // Connect to MongoDB
    await mongoose.connect(connectionString);

    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
