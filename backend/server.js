const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');
const eggRoutes = require('./routes/eggRoutes');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/eggs', eggRoutes);

// Connect DB and start server
sequelize.sync()
  .then(() => {
    console.log('Database connected');
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch(err => console.error('DB connection failed:', err));
