require('dotenv/config');
const express = require('express');
const { StatusCodes } = require('http-status-codes');
const organizationRouter = require('./routes/organizationRoute');
const errorHandlerMiddleware = require('./middleware/error-handler');
const featureRouter = require('./routes/featureRoute');
const roleRouter = require('./routes/roleRoute');

const app = express();
const port = process.env.PORT || 3000;


app.use(express.json());
app.use('/api/organization', organizationRouter);
app.use('/api/feature',featureRouter);
app.use('/api/role',roleRouter);
app.use(errorHandlerMiddleware);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
 