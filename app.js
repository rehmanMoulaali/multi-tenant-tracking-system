require('dotenv/config');
const express = require('express');
const { StatusCodes } = require('http-status-codes');
const organizationRouter = require('./routes/organizationRoute');
const errorHandlerMiddleware = require('./middlware/error-handler');
const app = express();
const port = process.env.PORT || 3000;


app.use(express.json());
app.use('/api/organization', organizationRouter);

app.use(errorHandlerMiddleware);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
 