const express = require('express')
const express = require('express');
const { dbConnect } = require('./utiles/db');
const app = express();
const cors = require('cors');
const http = require('http');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const socket = require('socket.io');

const server = http.createServer(app);

// Enable CORS for specific origins
const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true,
};
app.use(cors(corsOptions));

// Set up socket.io with CORS configuration
const io = socket(server, { cors: corsOptions });

// Define arrays to store users and sellers
let allCustomer = [];
let allSeller = [];

// Function to add a user
const addUser = (userId, socketId, userInfo, userList) => {
  const checkUser = userList.some(u => u.userId === userId);
  if (!checkUser) {
    userList.push({ userId, socketId, userInfo });
  }
};

// Function to remove a user or seller
const removeUser = (socketId, userList) => {
  userList = userList.filter(u => u.socketId !== socketId);
};

// Function to find a user or seller by ID
const findUser = (userId, userList) => {
  return userList.find(u => u.userId === userId);
};

// Function to handle admin removal
const removeAdmin = (socketId, admin) => {
  if (admin.socketId === socketId) {
    admin = {};
  }
};

let admin = {};

// Socket.io connection event
io.on('connection', soc => {
  console.log('socket server is connected...');

  soc.on('add_user', (userId, userInfo) => {
    addUser(userId, soc.id, userInfo, allCustomer);
    io.emit('activeSeller', allSeller);
    io.emit('activeCustomer', allCustomer);
  });

  soc.on('add_seller', (sellerId, userInfo) => {
    addUser(sellerId, soc.id, userInfo, allSeller);
    io.emit('activeSeller', allSeller);
    io.emit('activeCustomer', allCustomer);
    io.emit('activeAdmin', { status: true });
  });

  soc.on('add_admin', adminInfo => {
    delete adminInfo.email;
    admin = { ...adminInfo, socketId: soc.id };
    io.emit('activeSeller', allSeller);
    io.emit('activeAdmin', { status: true });
  });

  soc.on('send_seller_message', (msg) => {
    const customer = findCustomer(msg.receverId)
    if (customer !== undefined) {
        soc.to(customer.socketId).emit('seller_message', msg)
    }
})

soc.on('send_customer_message', (msg) => {
    const seller = findSeller(msg.receverId)
    if (seller !== undefined) {
        soc.to(seller.socketId).emit('customer_message', msg)
    }
})

soc.on('send_message_admin_to_seller', msg => {
    const seller = findSeller(msg.receverId)
    if (seller !== undefined) {
        soc.to(seller.socketId).emit('receved_admin_message', msg)
    }
})


soc.on('send_message_seller_to_admin', msg => {

    if (admin.socketId) {
        soc.to(admin.socketId).emit('receved_seller_message', msg)
    }
})

  soc.on('disconnect', () => {
    console.log('user disconnect');
    removeUser(soc.id, allCustomer);
    removeUser(soc.id, allSeller);
    removeAdmin(soc.id, admin);
    io.emit('activeAdmin', { status: false });
    io.emit('activeSeller', allSeller);
    io.emit('activeCustomer', allCustomer);
  });
});

// Middleware
app.use(bodyParser.json());
app.use(cookieParser());

// Route handlers
app.use('/api', require('./routes/chatRoutes'));
app.use('/api', require('./routes/paymentRoutes'));
app.use('/api', require('./routes/dashboard/dashboardIndexRoutes'));
app.use('/api/home', require('./routes/home/homeRoutes'));
app.use('/api', require('./routes/order/orderRoutes'));
app.use('/api', require('./routes/home/cardRoutes'));
app.use('/api', require('./routes/authRoutes'));
app.use('/api', require('./routes/home/customerAuthRoutes'));
app.use('/api', require('./routes/dashboard/sellerRoutes'));
app.use('/api', require('./routes/dashboard/categoryRoutes'));
app.use('/api', require('./routes/dashboard/productRoutes'));

// Default route
app.get('/', (req, res) => res.send('Hello World!'));

// Start the server
const port = process.env.PORT;
dbConnect();
server.listen(port, () => console.log(`Server is running on port ${port}!`));
