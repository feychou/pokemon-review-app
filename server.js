const express = require('express');
const cors = require('cors');

const employeesRoutes = require('./api/employees');
const reviewsRoutes = require('./api/reviews');

const server = express();

const body_parser = require('body-parser');

const port = 4000;

server.use(body_parser.json());
server.use(cors());

server.use('/employees', employeesRoutes);
server.use('/reviews', reviewsRoutes);

server.listen(port, () => {
   console.log(`Server listening at ${port}`);
});