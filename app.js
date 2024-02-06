require('dotenv/config')
const express = require('express')
const app = express()
const port = process.env.PORT||3000
const organizationRouter=require('./routes/organizationRoute')
app.use(express.json());
app.use('/api/organization',organizationRouter);
app.listen(port, () => console.log(`Example app listening on port ${port}!`))