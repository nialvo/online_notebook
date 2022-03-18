const express = require('express');
const apiRoutes = require('./routes/API_routes');
const htmlRoutes = require('./routes/HTML_routes');

// initialize express and assign port
const app = express();
const PORT = process.env.PORT || 3001;

//parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//static
app.use(express.static('public'));

//routes
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// start server
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));