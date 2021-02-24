const express = require('express');
const router = require('./routes/router');
const body = require('body-parser');
const cors = require('cors');

const app = express();
const port = 4000;
app.use(cors());
app.use(body.json());


app.use('/',router);

app.listen(4000);
