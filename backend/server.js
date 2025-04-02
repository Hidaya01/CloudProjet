const express = require ('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const chatRoutes = require('./routes/chatRoutes');

const app = express();
const server = http.createServer(app);

// CORS middleware for express
app.use(cors({
  origin: 'http://localhost:3001',  
  methods: ['GET', 'POST'],
  credentials: true // Allow credentials like cookies or authorization headers
}));

// Create Socket.IO instance with the same CORS configuration
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3001',  // Allow frontend requests from localhost:3001
    methods: ['GET', 'POST'],
    credentials: true // Allow credentials like cookies or authorization headers
  }
});

// Route imports
const projectRoutes = require('./routes/projectRoutes');
const taskRoutes = require('./routes/taskRoutes');

// Use API routes
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);
app.use(express.json());
app.use('/api/chat', chatRoutes);

// Socket.IO connection handler
io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) return next(new Error('Authentication error'));

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        socket.user = user; // Attach user details to the socket object
        next();
    } catch (err) {
        next(new Error('Invalid token'));
    }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Chat API running on port ${PORT}`);
});
