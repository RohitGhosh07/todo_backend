const express = require('express');
const cors = require('cors'); // Import the cors package
const connectDB = require('./config/db');
const userRoutes = require('./routes/user_routes');
const taskRoutes = require('./routes/task_routes');

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json());
app.use(cors()); // Use the cors middleware to enable CORS

// Define Routes
app.use('/users', userRoutes);
app.use('/tasks', taskRoutes);

app.get('/', (req, res) => res.send('API Running'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
