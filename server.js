const express = require('express');
require('dotenv').config();
const cors = require('cors');
const connectDB = require('./config/db');

const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Database Connection
connectDB(process.env.MONGODB_URI)

const auth = require('./middleware/auth');
app.get('/api/protected', auth, (req, res) => {
  res.json({ message: 'You accessed a protected route', user: req.user });
});

app.get("/",(req,res)=>{
    res.send("Home page");
})

app.listen(process.env.PORT,()=>{
    console.log("Server is running on port",process.env.PORT)
})
