const express = require('express');
require('./connection/Connection.Database.js');
const { StatusCodes: { OK, ACCEPTED, CREATED, NOT_FOUND, NO_CONTENT, BAD_REQUEST } } = require('http-status-codes');
const RoxillerRoutes = require('./routes/Roxiller.routes.js');

const { config } = require('dotenv')
config();

const app = express();
app.use(express.json()); //

app.use('/api/roxiller',RoxillerRoutes);

app.use('*', (req, res, next) => {
    res.status(NOT_FOUND).json({ error: true, message: "Page Not Found !" });
})

app.listen(process.env.PORT, () => {

    console.log(`Server listening on ${process.env.PORT}`);
});