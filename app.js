// core modules
const express = require('express');
const mongoose = require('mongoose'); 

// my imports
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const publicRoutes = require('./routes/public');

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// parsing requests
app.use(express.json()); 

// routes
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/public', publicRoutes);

//error handling middleware
app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data })
})

// spinning up a server with database connection
mongoose
    .connect('mongodb+srv://johnny:1234@cluster0.awjuf.mongodb.net/misijaweb?retryWrites=true&w=majority')
    .then(result => {
        app.listen(3000);
    })
    .catch(err => console.log(err));
